import React, { useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FaPlus, FaCopy, FaCheck, FaExternalLinkAlt,
  FaChevronDown, FaChevronUp, FaSignOutAlt, FaSync, FaLock,
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

// ─── Animation variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Password Gate ───────────────────────────────────────────────────────────
function PasswordGate({ onAuth }) {
  const [pw, setPw]         = useState('');
  const [error, setError]   = useState('');
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
    <PageWrapper>
      <BgImage src="images/mainbg.jpg" alt="" />
      <BgOverlay />
      <GateContent
        as={motion.div}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <EyebrowLabel>Anakupto Platform</EyebrowLabel>
        <PageTitle>Admin Dashboard</PageTitle>
        <PageSub>Enter your password to access the client dashboard.</PageSub>
        <GlassCard>
          <LockIcon><FaLock size={18} /></LockIcon>
          <GateForm onSubmit={handleSubmit}>
            <FieldInput
              type="password"
              placeholder="Password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoFocus
            />
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <AccentButton type="submit" disabled={loading || !pw}>
              {loading ? 'Verifying…' : 'Enter Dashboard →'}
            </AccentButton>
          </GateForm>
        </GlassCard>
      </GateContent>
    </PageWrapper>
  );
}

// ─── New Client Modal ────────────────────────────────────────────────────────
function NewClientModal({ adminKey, onClose, onCreated }) {
  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError]   = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stripe/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ clientName: name, clientEmail: email, appUrl: window.location.origin }),
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
    <ModalBackdrop
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalCard
        as={motion.div}
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {!result ? (
          <>
            <ModalEyebrow>New Client</ModalEyebrow>
            <ModalTitle>Add a Client</ModalTitle>
            <ModalSub>Creates a Stripe account and generates an onboarding link you can send them. They only need an email to get started.</ModalSub>
            <GateForm onSubmit={handleCreate}>
              <FieldLabel>Business / Client Name</FieldLabel>
              <FieldInput placeholder="e.g. Angel Face Studio" value={name} onChange={(e) => setName(e.target.value)} />
              <FieldLabel>Email <MutedLabel>(optional)</MutedLabel></FieldLabel>
              <FieldInput type="email" placeholder="client@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              {error && <ErrorMsg>{error}</ErrorMsg>}
              <ModalActions>
                <GhostButton type="button" onClick={onClose}>Cancel</GhostButton>
                <AccentButton type="submit" disabled={loading || !name}>
                  {loading ? 'Creating…' : 'Create Account →'}
                </AccentButton>
              </ModalActions>
            </GateForm>
          </>
        ) : (
          <>
            <SuccessBadge>✓ Account Created</SuccessBadge>
            <ModalTitle>{name}</ModalTitle>
            <ModalSub>Copy the link below and send it to your client. They'll complete the rest directly with Stripe.</ModalSub>
            <AccountIdBox><Mono>{result.accountId}</Mono></AccountIdBox>
            <LinkRow>
              <LinkText>{result.onboardingUrl}</LinkText>
              <CopyBtn onClick={copyLink} $copied={copied}>
                {copied ? <><FaCheck size={11}/> Copied!</> : <><FaCopy size={11}/> Copy Link</>}
              </CopyBtn>
            </LinkRow>
            <ModalActions>
              <AccentButton onClick={onClose}>Done</AccentButton>
            </ModalActions>
          </>
        )}
      </ModalCard>
    </ModalBackdrop>
  );
}

// ─── Client Row ──────────────────────────────────────────────────────────────
function ClientRow({ account, adminKey }) {
  const [expanded, setExpanded]       = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [onboardingUrl, setOnboardingUrl] = useState('');
  const [copied, setCopied]           = useState(false);

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
            <ClientSub>{account.email || account.id}</ClientSub>
          </div>
        </ClientLeft>
        <ClientRight>
          <ClientAge>{timeAgo(account.created)}</ClientAge>
          {expanded ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
        </ClientRight>
      </ClientHeader>

      <AnimatePresence>
        {expanded && (
          <ClientDetails
            as={motion.div}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <PillRow>
              <StatusPill $ok={account.detailsSubmitted}>Details submitted</StatusPill>
              <StatusPill $ok={account.chargesEnabled}>Charges enabled</StatusPill>
              <StatusPill $ok={account.payoutsEnabled}>Payouts enabled</StatusPill>
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
                <OutlineButton onClick={generateLink} disabled={linkLoading}>
                  <FaExternalLinkAlt size={11} />
                  {linkLoading ? 'Generating…' : 'Get Onboarding Link'}
                </OutlineButton>
              ) : (
                <LinkRow>
                  <LinkText small>{onboardingUrl}</LinkText>
                  <CopyBtn onClick={copyLink} $copied={copied} small>
                    {copied ? <><FaCheck size={10}/> Copied!</> : <><FaCopy size={10}/> Copy</>}
                  </CopyBtn>
                </LinkRow>
              )}
            </DetailActions>
          </ClientDetails>
        )}
      </AnimatePresence>
    </ClientCard>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
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

  React.useEffect(() => { fetchAll(); }, [fetchAll]);

  return (
    <PageWrapper>
      <BgImage src="images/mainbg.jpg" alt="" />
      <BgOverlay />

      <DashContent style={{ alignSelf: 'flex-start', paddingTop: '1rem' }}
        as={motion.div}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <DashHeader>
          <div>
            <EyebrowLabel>Anakupto Platform</EyebrowLabel>
            <PageTitle style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: 0 }}>
              Client Dashboard
            </PageTitle>
          </div>
          <HeaderBtns>
            <IconBtn onClick={fetchAll} disabled={refreshing} title="Refresh">
              <FaSync size={13} style={{ opacity: refreshing ? 0.4 : 1 }} />
            </IconBtn>
            <IconBtn onClick={onLogout} title="Sign out">
              <FaSignOutAlt size={13} />
            </IconBtn>
          </HeaderBtns>
        </DashHeader>

        {/* Stat Cards */}
        <StatGrid>
          {[
            { label: 'Available Balance', value: loading ? '—' : fmt(balance?.available), sub: 'Ready to payout' },
            { label: 'Pending',           value: loading ? '—' : fmt(balance?.pending),   sub: 'In transit' },
            { label: 'Connected Clients', value: loading ? '—' : accounts.length,         sub: 'Active accounts' },
          ].map(({ label, value, sub }) => (
            <StatCard key={label}>
              <StatLabel>{label}</StatLabel>
              <StatValue>{value}</StatValue>
              <StatSub>{sub}</StatSub>
            </StatCard>
          ))}
        </StatGrid>

        {/* Clients */}
        <SectionHeader>
          <SectionTitle>Connected Clients</SectionTitle>
          <AccentButton onClick={() => setShowModal(true)} small>
            <FaPlus size={10} /> Add Client
          </AccentButton>
        </SectionHeader>

        {loading ? (
          <EmptyCard>Loading clients…</EmptyCard>
        ) : accounts.length === 0 ? (
          <EmptyCard>
            No clients yet.{' '}
            <GoldLink onClick={() => setShowModal(true)}>Add your first client →</GoldLink>
          </EmptyCard>
        ) : (
          <ClientList>
            {accounts.map((acc) => (
              <ClientRow key={acc.id} account={acc} adminKey={adminKey} />
            ))}
          </ClientList>
        )}
      </DashContent>

      <AnimatePresence>
        {showModal && (
          <NewClientModal
            adminKey={adminKey}
            onClose={() => setShowModal(false)}
            onCreated={fetchAll}
          />
        )}
      </AnimatePresence>
    </PageWrapper>
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
      <Helmet><title>Admin — Anakupto</title></Helmet>
      <AnimatePresence mode="wait">
        {!adminKey
          ? <PasswordGate key="gate" onAuth={handleAuth} />
          : <Dashboard   key="dash" adminKey={adminKey} onLogout={handleLogout} />
        }
      </AnimatePresence>
    </>
  );
}

// ─── Animations ──────────────────────────────────────────────────────────────
const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1; }
`;

// ─── Shared Layout ───────────────────────────────────────────────────────────
const PageWrapper = styled.div`
  position: relative;
  min-height: calc(100vh - var(--navbar-h));
  margin-top: var(--navbar-h);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem 5rem;
  overflow: hidden;
`;

const BgImage = styled.img`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
  pointer-events: none;
`;

const BgOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.78);
  z-index: 1;
  pointer-events: none;
`;

const EyebrowLabel = styled.p`
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent-light);
  margin: 0 0 0.6rem;
`;

const PageTitle = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 0.75rem;
`;

const PageSub = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.75;
  margin: 0 0 2rem;
`;

// ─── Gate ────────────────────────────────────────────────────────────────────
const GateContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 440px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GlassCard = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.45);
`;

const LockIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(14, 165, 233, 0.4);
  color: var(--color-accent-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  animation: ${pulse} 2.5s ease-in-out infinite;
`;

const GateForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  text-align: left;
`;

const FieldLabel = styled.label`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: -0.35rem;
`;

const MutedLabel = styled.span`
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  opacity: 0.6;
`;

const FieldInput = styled.input`
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  color: #ffffff;
  font-family: var(--font-body);
  font-size: 0.95rem;
  padding: 0.8rem 1rem;
  outline: none;
  width: 100%;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.18);
  }
  &::placeholder { color: rgba(255, 255, 255, 0.3); }
`;

const AccentButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--color-accent);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: ${({ small }) => (small ? '0.8rem' : '0.9rem')};
  font-weight: 600;
  padding: ${({ small }) => (small ? '0.5rem 1rem' : '0.85rem 1.75rem')};
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
  &:hover:not(:disabled) { background: var(--color-accent-dark); transform: translateY(-1px); }
  &:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
`;

const GhostButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.55);
  font-family: var(--font-body);
  font-size: 0.88rem;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
  &:hover { border-color: rgba(255,255,255,0.3); color: #fff; }
`;

const OutlineButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: 1px solid rgba(14, 165, 233, 0.35);
  border-radius: 8px;
  color: var(--color-accent-light);
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 500;
  padding: 0.45rem 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover:not(:disabled) { background: rgba(14,165,233,0.1); border-color: var(--color-accent); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const ErrorMsg = styled.p`
  font-size: 0.8rem;
  color: #f87171;
  margin: 0;
`;

// ─── Dashboard ───────────────────────────────────────────────────────────────
const DashContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 860px;
`;

const DashHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const HeaderBtns = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-top: 0.25rem;
`;

const IconBtn = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { border-color: rgba(255,255,255,0.25); color: #fff; }
  &:disabled { opacity: 0.35; cursor: not-allowed; }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const StatCard = styled.div`
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  padding: 1.5rem;
  transition: border-color 0.2s ease;
  &:hover { border-color: rgba(14,165,233,0.3); }
`;

const StatLabel = styled.p`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin: 0 0 0.5rem;
`;

const StatValue = styled.p`
  font-family: var(--font-display);
  font-size: 1.9rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.25rem;
  letter-spacing: -0.02em;
`;

const StatSub = styled.p`
  font-size: 0.75rem;
  color: var(--color-gold);
  margin: 0;
  font-weight: 500;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

const ClientList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ClientCard = styled.div`
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.2s ease;
  &:hover { border-color: rgba(255,255,255,0.18); }
`;

const ClientHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  cursor: pointer;
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
  flex-shrink: 0;
  background: ${({ $ok }) => ($ok ? '#34d399' : 'rgba(255,255,255,0.25)')};
  box-shadow: ${({ $ok }) => ($ok ? '0 0 8px rgba(52,211,153,0.5)' : 'none')};
`;

const ClientName = styled.p`
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.1rem;
`;

const ClientSub = styled.p`
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  margin: 0;
`;

const ClientRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255,255,255,0.3);
`;

const ClientAge = styled.span`
  font-size: 0.72rem;
  color: rgba(255,255,255,0.3);
`;

const ClientDetails = styled.div`
  padding: 0 1.25rem 1.25rem;
  border-top: 1px solid rgba(255,255,255,0.07);
  overflow: hidden;
`;

const PillRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1rem 0 0.75rem;
`;

const StatusPill = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: ${({ $ok }) => ($ok ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.06)')};
  color: ${({ $ok }) => ($ok ? '#34d399' : 'rgba(255,255,255,0.35)')};
  border: 1px solid ${({ $ok }) => ($ok ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.1)')};
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.4rem;
`;

const DetailLabel = styled.span`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  width: 110px;
  flex-shrink: 0;
`;

const DetailValue = styled.span`
  font-size: 0.82rem;
  color: rgba(255,255,255,0.65);
`;

const Mono = styled.code`
  font-family: var(--font-mono);
  font-size: ${({ small }) => (small ? '0.7rem' : '0.78rem')};
  color: rgba(255,255,255,0.55);
  word-break: break-all;
`;

const DetailActions = styled.div`
  margin-top: 1rem;
`;

const EmptyCard = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px dashed rgba(255,255,255,0.1);
  border-radius: 14px;
  padding: 3rem 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.35);
`;

const GoldLink = styled.span`
  color: var(--color-gold);
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

// ─── Modal ───────────────────────────────────────────────────────────────────
const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalCard = styled.div`
  background: rgba(13, 15, 26, 0.95);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 20px;
  padding: 2rem 2rem 2rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 32px 64px rgba(0,0,0,0.6);
`;

const ModalEyebrow = styled.p`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent-light);
  margin: 0 0 0.4rem;
`;

const ModalTitle = styled.h2`
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 0.5rem;
`;

const ModalSub = styled.p`
  font-size: 0.875rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.7;
  margin: 0 0 1.5rem;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const SuccessBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #34d399;
  background: rgba(52,211,153,0.1);
  border: 1px solid rgba(52,211,153,0.25);
  border-radius: 999px;
  padding: 0.3rem 0.85rem;
  margin-bottom: 1rem;
`;

const AccountIdBox = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  word-break: break-all;
`;

const LinkRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  flex-wrap: wrap;
`;

const LinkText = styled.span`
  font-family: var(--font-mono);
  font-size: ${({ small }) => (small ? '0.65rem' : '0.72rem')};
  color: rgba(255,255,255,0.4);
  word-break: break-all;
  flex: 1;
`;

const CopyBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: ${({ $copied }) => ($copied ? 'rgba(52,211,153,0.15)' : 'transparent')};
  color: ${({ $copied }) => ($copied ? '#34d399' : 'var(--color-accent-light)')};
  border: 1px solid ${({ $copied }) => ($copied ? 'rgba(52,211,153,0.3)' : 'rgba(14,165,233,0.35)')};
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: ${({ small }) => (small ? '0.7rem' : '0.75rem')};
  font-weight: 600;
  padding: 0.3rem 0.65rem;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s ease;
`;
