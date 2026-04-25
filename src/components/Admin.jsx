import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FaPlus, FaCopy, FaCheck, FaExternalLinkAlt,
  FaChevronDown, FaChevronUp, FaSignOutAlt, FaSync,
} from 'react-icons/fa';

// ─── helpers ────────────────────────────────────────────────────────────────
const fmt = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n ?? 0);

const timeAgo = (unix) => {
  const diff = Date.now() / 1000 - unix;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

// ─── Password Gate ───────────────────────────────────────────────────────────
function PasswordGate({ onAuth }) {
  const [pw, setPw]     = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stripe/balance', {
        headers: { 'x-admin-key': pw },
      });
      if (res.ok) {
        onAuth(pw);
      } else {
        setError('Incorrect password.');
      }
    } catch {
      setError('Could not connect. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GateWrapper>
      <GateCard
        as={motion.div}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <GateLabel>Anakupto</GateLabel>
        <GateTitle>Admin Dashboard</GateTitle>
        <GateSub>Enter your admin password to continue.</GateSub>
        <GateForm onSubmit={handleSubmit}>
          <GateInput
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoFocus
          />
          {error && <GateError>{error}</GateError>}
          <GateButton type="submit" disabled={loading || !pw}>
            {loading ? 'Verifying…' : 'Enter'}
          </GateButton>
        </GateForm>
      </GateCard>
    </GateWrapper>
  );
}

// ─── New Client Modal ────────────────────────────────────────────────────────
function NewClientModal({ adminKey, onClose, onCreated }) {
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [copied, setCopied]   = useState(false);
  const [error, setError]     = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stripe/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({
          clientName: name,
          clientEmail: email,
          appUrl: window.location.origin,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
      onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(result.onboardingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalCard
        as={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        {!result ? (
          <>
            <ModalTitle>Add New Client</ModalTitle>
            <ModalSub>Creates a Stripe Express account and generates an onboarding link to send them.</ModalSub>
            <ModalForm onSubmit={handleCreate}>
              <FieldLabel>Client / Business Name</FieldLabel>
              <FieldInput
                placeholder="e.g. Angel Face Studio"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FieldLabel>Email <Muted>(optional)</Muted></FieldLabel>
              <FieldInput
                type="email"
                placeholder="client@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <ErrorMsg>{error}</ErrorMsg>}
              <ModalActions>
                <CancelBtn type="button" onClick={onClose}>Cancel</CancelBtn>
                <PrimaryBtn type="submit" disabled={loading || !name}>
                  {loading ? 'Creating…' : 'Create Account'}
                </PrimaryBtn>
              </ModalActions>
            </ModalForm>
          </>
        ) : (
          <>
            <SuccessIcon>✓</SuccessIcon>
            <ModalTitle>Account Created!</ModalTitle>
            <ModalSub>
              Copy the onboarding link below and send it to <strong>{name}</strong>. They only need an email and basic info to get started — no bank details required upfront.
            </ModalSub>
            <AccountIdRow>
              <Mono>{result.accountId}</Mono>
            </AccountIdRow>
            <LinkBox>
              <LinkText>{result.onboardingUrl}</LinkText>
              <CopyBtn onClick={copyLink} $copied={copied}>
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? 'Copied!' : 'Copy Link'}
              </CopyBtn>
            </LinkBox>
            <ModalActions>
              <PrimaryBtn onClick={onClose}>Done</PrimaryBtn>
            </ModalActions>
          </>
        )}
      </ModalCard>
    </ModalBackdrop>
  );
}

// ─── Client Row ──────────────────────────────────────────────────────────────
function ClientRow({ account, adminKey }) {
  const [expanded, setExpanded] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [onboardingUrl, setOnboardingUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLink = async () => {
    setLinkLoading(true);
    try {
      const res = await fetch('/api/stripe/account-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ accountId: account.id, appUrl: window.location.origin }),
      });
      const data = await res.json();
      setOnboardingUrl(data.onboardingUrl);
    } finally {
      setLinkLoading(false);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(onboardingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const allGood = account.chargesEnabled && account.payoutsEnabled;

  return (
    <ClientCard>
      <ClientHeader onClick={() => setExpanded(p => !p)}>
        <ClientLeft>
          <StatusDot $ok={allGood} />
          <div>
            <ClientName>{account.name || '(unnamed)'}</ClientName>
            <ClientMeta>{account.email || account.id}</ClientMeta>
          </div>
        </ClientLeft>
        <ClientRight>
          <ClientAge>{timeAgo(account.created)}</ClientAge>
          {expanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </ClientRight>
      </ClientHeader>

      <AnimatePresence>
        {expanded && (
          <ClientDetails
            as={motion.div}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <PillRow>
              <Pill $ok={account.detailsSubmitted}>Details submitted</Pill>
              <Pill $ok={account.chargesEnabled}>Charges enabled</Pill>
              <Pill $ok={account.payoutsEnabled}>Payouts enabled</Pill>
            </PillRow>

            <DetailRow>
              <DetailLabel>Account ID</DetailLabel>
              <Mono small>{account.id}</Mono>
            </DetailRow>
            {account.country && (
              <DetailRow>
                <DetailLabel>Country</DetailLabel>
                <DetailValue>{account.country.toUpperCase()}</DetailValue>
              </DetailRow>
            )}

            <DetailActions>
              {!onboardingUrl ? (
                <SecondaryBtn onClick={generateLink} disabled={linkLoading}>
                  <FaExternalLinkAlt size={11} />
                  {linkLoading ? 'Generating…' : 'Get Onboarding Link'}
                </SecondaryBtn>
              ) : (
                <LinkBox>
                  <LinkText small>{onboardingUrl}</LinkText>
                  <CopyBtn onClick={copyLink} $copied={copied} small>
                    {copied ? <FaCheck /> : <FaCopy />}
                    {copied ? 'Copied!' : 'Copy'}
                  </CopyBtn>
                </LinkBox>
              )}
            </DetailActions>
          </ClientDetails>
        )}
      </AnimatePresence>
    </ClientCard>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────
function Dashboard({ adminKey, onLogout }) {
  const [balance, setBalance]   = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAll = useCallback(async () => {
    setRefreshing(true);
    try {
      const [balRes, accRes] = await Promise.all([
        fetch('/api/stripe/balance',  { headers: { 'x-admin-key': adminKey } }),
        fetch('/api/stripe/accounts', { headers: { 'x-admin-key': adminKey } }),
      ]);
      const [balData, accData] = await Promise.all([balRes.json(), accRes.json()]);
      setBalance(balData);
      setAccounts(accData.accounts || []);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [adminKey]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  return (
    <DashWrapper>
      <DashHeader>
        <div>
          <DashLabel>Anakupto Platform</DashLabel>
          <DashTitle>Client Dashboard</DashTitle>
        </div>
        <HeaderActions>
          <IconBtn onClick={fetchAll} disabled={refreshing} title="Refresh">
            <FaSync size={14} style={{ opacity: refreshing ? 0.4 : 1 }} />
          </IconBtn>
          <IconBtn onClick={onLogout} title="Sign out">
            <FaSignOutAlt size={14} />
          </IconBtn>
        </HeaderActions>
      </DashHeader>

      {/* Balance Cards */}
      <CardGrid>
        <StatCard>
          <StatLabel>Available Balance</StatLabel>
          <StatValue>{loading ? '—' : fmt(balance?.available)}</StatValue>
          <StatSub>Ready to payout</StatSub>
        </StatCard>
        <StatCard>
          <StatLabel>Pending</StatLabel>
          <StatValue>{loading ? '—' : fmt(balance?.pending)}</StatValue>
          <StatSub>In transit</StatSub>
        </StatCard>
        <StatCard>
          <StatLabel>Connected Clients</StatLabel>
          <StatValue>{loading ? '—' : accounts.length}</StatValue>
          <StatSub>Active accounts</StatSub>
        </StatCard>
      </CardGrid>

      {/* Clients List */}
      <Section>
        <SectionHeader>
          <SectionTitle>Connected Clients</SectionTitle>
          <AddBtn onClick={() => setShowModal(true)}>
            <FaPlus size={11} /> Add Client
          </AddBtn>
        </SectionHeader>

        {loading ? (
          <EmptyState>Loading clients…</EmptyState>
        ) : accounts.length === 0 ? (
          <EmptyState>
            No connected clients yet.{' '}
            <span onClick={() => setShowModal(true)} style={{ color: 'var(--color-accent)', cursor: 'pointer' }}>
              Add your first client →
            </span>
          </EmptyState>
        ) : (
          <ClientList>
            {accounts.map((acc) => (
              <ClientRow key={acc.id} account={acc} adminKey={adminKey} />
            ))}
          </ClientList>
        )}
      </Section>

      <AnimatePresence>
        {showModal && (
          <NewClientModal
            adminKey={adminKey}
            onClose={() => setShowModal(false)}
            onCreated={() => { fetchAll(); }}
          />
        )}
      </AnimatePresence>
    </DashWrapper>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────
export default function Admin() {
  const [adminKey, setAdminKey] = useState(
    () => sessionStorage.getItem('admin_key') || ''
  );

  const handleAuth = (key) => {
    sessionStorage.setItem('admin_key', key);
    setAdminKey(key);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_key');
    setAdminKey('');
  };

  return (
    <>
      <Helmet>
        <title>Admin — Anakupto</title>
      </Helmet>
      <PageWrapper>
        <AnimatePresence mode="wait">
          {!adminKey ? (
            <motion.div key="gate" style={{ width: '100%' }}>
              <PasswordGate onAuth={handleAuth} />
            </motion.div>
          ) : (
            <motion.div
              key="dash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ width: '100%' }}
            >
              <Dashboard adminKey={adminKey} onLogout={handleLogout} />
            </motion.div>
          )}
        </AnimatePresence>
      </PageWrapper>
    </>
  );
}

// ─── Styled Components ───────────────────────────────────────────────────────
const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--color-bg);
  padding-top: var(--navbar-h);
  display: flex;
  flex-direction: column;
`;

// Gate
const GateWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  min-height: calc(100vh - var(--navbar-h));
`;

const GateCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  backdrop-filter: blur(16px);
  box-shadow: var(--shadow-card);
`;

const GateLabel = styled.p`
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent-light);
  margin: 0 0 0.5rem;
`;

const GateTitle = styled.h1`
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem;
`;

const GateSub = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin: 0 0 1.75rem;
  line-height: 1.6;
`;

const GateForm = styled.form`display: flex; flex-direction: column; gap: 0.75rem;`;

const GateInput = styled.input`
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: 0.95rem;
  padding: 0.75rem 1rem;
  outline: none;
  transition: var(--transition-fast);
  &:focus { border-color: var(--color-accent); box-shadow: 0 0 0 3px rgba(14,165,233,0.15); }
  &::placeholder { color: var(--color-text-muted); }
`;

const GateError = styled.p`
  font-size: 0.8rem;
  color: #f87171;
  margin: 0;
`;

const GateButton = styled.button`
  background: var(--color-accent);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: var(--transition-fast);
  &:hover:not(:disabled) { background: var(--color-accent-dark); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

// Dashboard
const DashWrapper = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 3rem 1.5rem 6rem;
  width: 100%;
`;

const DashHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2.5rem;
`;

const DashLabel = styled.p`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent-light);
  margin: 0 0 0.4rem;
`;

const DashTitle = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: var(--color-text-primary);
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const IconBtn = styled.button`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-fast);
  &:hover { border-color: var(--color-border-hover); color: var(--color-text-primary); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const StatCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
`;

const StatLabel = styled.p`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin: 0 0 0.5rem;
`;

const StatValue = styled.p`
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 0.25rem;
`;

const StatSub = styled.p`
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin: 0;
`;

const Section = styled.div``;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
`;

const AddBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--color-accent);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: var(--transition-fast);
  &:hover { background: var(--color-accent-dark); }
`;

const ClientList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ClientCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
`;

const ClientHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: var(--transition-fast);
  &:hover { background: rgba(255,255,255,0.03); }
`;

const ClientLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $ok }) => ($ok ? '#34d399' : '#f87171')};
  flex-shrink: 0;
`;

const ClientName = styled.p`
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-text-primary);
  margin: 0 0 0.1rem;
`;

const ClientMeta = styled.p`
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin: 0;
`;

const ClientRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text-muted);
`;

const ClientAge = styled.span`
  font-size: 0.75rem;
  color: var(--color-text-muted);
`;

const ClientDetails = styled.div`
  padding: 0 1.25rem 1.25rem;
  border-top: 1px solid var(--color-border);
  overflow: hidden;
`;

const PillRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

const Pill = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  background: ${({ $ok }) => ($ok ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)')};
  color: ${({ $ok }) => ($ok ? '#34d399' : '#f87171')};
  border: 1px solid ${({ $ok }) => ($ok ? 'rgba(52,211,153,0.25)' : 'rgba(248,113,113,0.25)')};
`;

const DetailRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const DetailLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  width: 120px;
  flex-shrink: 0;
`;

const DetailValue = styled.span`
  font-size: 0.85rem;
  color: var(--color-text-secondary);
`;

const Mono = styled.code`
  font-family: var(--font-mono);
  font-size: ${({ small }) => (small ? '0.72rem' : '0.8rem')};
  color: var(--color-text-secondary);
  word-break: break-all;
`;

const DetailActions = styled.div`
  margin-top: 1rem;
`;

const EmptyState = styled.p`
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  padding: 3rem 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
`;

// Modal
const ModalBackdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(6px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalCard = styled.div`
  background: #131629;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  width: 100%;
  max-width: 480px;
  box-shadow: var(--shadow-card);
`;

const ModalTitle = styled.h2`
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem;
`;

const ModalSub = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  margin: 0 0 1.5rem;
`;

const ModalForm = styled.form`display: flex; flex-direction: column; gap: 0.75rem;`;

const FieldLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: -0.25rem;
`;

const Muted = styled.span`
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  opacity: 0.6;
`;

const FieldInput = styled(GateInput)`width: 100%;`;

const ErrorMsg = styled.p`font-size: 0.8rem; color: #f87171; margin: 0;`;

const ModalActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const CancelBtn = styled.button`
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 0.85rem;
  padding: 0.65rem 1.25rem;
  cursor: pointer;
  transition: var(--transition-fast);
  &:hover { border-color: var(--color-border-hover); color: var(--color-text-primary); }
`;

const PrimaryBtn = styled.button`
  background: var(--color-accent);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.65rem 1.5rem;
  cursor: pointer;
  transition: var(--transition-fast);
  &:hover:not(:disabled) { background: var(--color-accent-dark); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const SecondaryBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: var(--transition-fast);
  &:hover:not(:disabled) { border-color: var(--color-accent); color: var(--color-accent); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const SuccessIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const AccountIdRow = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  word-break: break-all;
`;

const LinkBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.75rem;
  flex-wrap: wrap;
`;

const LinkText = styled.span`
  font-family: var(--font-mono);
  font-size: ${({ small }) => (small ? '0.68rem' : '0.75rem')};
  color: var(--color-text-muted);
  word-break: break-all;
  flex: 1;
`;

const CopyBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: ${({ $copied }) => ($copied ? 'var(--color-accent)' : 'transparent')};
  color: ${({ $copied }) => ($copied ? 'white' : 'var(--color-accent)')};
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: ${({ small }) => (small ? '0.72rem' : '0.78rem')};
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  cursor: pointer;
  transition: var(--transition-fast);
  white-space: nowrap;
  flex-shrink: 0;
`;
