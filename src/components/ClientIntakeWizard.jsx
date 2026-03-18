import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  FaLaptopCode,
  FaGlobe,
  FaMobileAlt,
  FaShoppingCart,
  FaPaintBrush,
  FaTools,
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaCheckCircle,
} from 'react-icons/fa';

// ─── EmailJS config ───────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_qergbjn';
const EMAILJS_TEMPLATE_ID = 'template_purd9i6';
const EMAILJS_PUBLIC_KEY  = 'sfy94T_0JRB3qPReX';

// ─── Static data ─────────────────────────────────────────────────────────────
const PROJECT_TYPES = [
  { id: 'web-app',      icon: FaLaptopCode,    label: 'Web Application',      sub: 'Full-stack web platform' },
  { id: 'website',      icon: FaGlobe,         label: 'Website / Landing Page', sub: 'Marketing or portfolio site' },
  { id: 'mobile',       icon: FaMobileAlt,     label: 'Mobile App',           sub: 'iOS / Android application' },
  { id: 'ecommerce',    icon: FaShoppingCart,  label: 'E-Commerce',           sub: 'Online store or marketplace' },
  { id: 'design',       icon: FaPaintBrush,    label: 'UI/UX Design',         sub: 'Design system or prototype' },
  { id: 'other',        icon: FaTools,         label: 'Something Else',       sub: "Let's talk about it" },
];

const BUDGET_OPTIONS   = ['Under $1,000', '$1k–$5k', '$5k–$15k', '$15k+', "Let's Discuss"];
const TIMELINE_OPTIONS = ['ASAP', '1–3 Months', '3–6 Months', '6+ Months', 'Flexible'];
const FEATURE_OPTIONS  = [
  'User Authentication', 'Admin Dashboard', 'Payment Integration',
  'API Integration', 'Real-time Features', 'Database Design',
  'Mobile Responsive', 'SEO Optimization', 'CMS Integration',
  'Analytics', 'Email Notifications', '3rd-Party Integrations',
];
const DAY_OPTIONS      = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const TIME_OPTIONS     = ['Morning (9am–12pm)', 'Afternoon (12pm–5pm)', 'Evening (5pm–8pm)'];

const STEP_LABELS = ['About You', 'Project Type', 'Scope', 'Requirements', 'Schedule'];
const TOTAL_STEPS = 5;

// ─── Framer Motion variants ───────────────────────────────────────────────────
const slideVariants = {
  enter:  (dir) => ({ x: dir > 0 ?  50 : -50, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit:   (dir) => ({
    x: dir > 0 ? -50 : 50,
    opacity: 0,
    transition: { duration: 0.18 },
  }),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function buildEmailMessage(data) {
  const featureList = data.features.length ? data.features.join(', ') : 'None selected';
  const dayList     = data.preferredDays.length ? data.preferredDays.join(', ') : 'No preference';

  return `
CLIENT INTAKE SUMMARY
─────────────────────────────────────────
ABOUT
Name:     ${data.name}
Email:    ${data.email}
Company:  ${data.company || '—'}

PROJECT
Type:     ${data.projectType}

SCOPE
Description:
${data.description}

Budget:   ${data.budget}
Timeline: ${data.timeline}

REQUIREMENTS
Features: ${featureList}
Tech Notes:
${data.techNotes || '—'}

SCHEDULING
Preferred Days: ${dayList}
Preferred Time: ${data.preferredTime || 'No preference'}
Additional Notes:
${data.additionalNotes || '—'}
─────────────────────────────────────────
  `.trim();
}

function isStepValid(step, data) {
  if (step === 1) return data.name.trim() !== '' && data.email.trim() !== '';
  if (step === 2) return data.projectType !== '';
  if (step === 3) return data.description.trim() !== '' && data.budget !== '' && data.timeline !== '';
  return true;
}

// ─── Main component ───────────────────────────────────────────────────────────
function ClientIntakeWizard() {
  const [step,        setStep]        = useState(1);
  const [dir,         setDir]         = useState(1);
  const [submitted,   setSubmitted]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error,       setError]       = useState('');
  const [data,        setData]        = useState({
    name: '', email: '', company: '',
    projectType: '',
    description: '', budget: '', timeline: '',
    features: [], techNotes: '',
    preferredDays: [], preferredTime: '', additionalNotes: '',
  });

  const set = (field, value) => setData(prev => ({ ...prev, [field]: value }));

  const toggleArrayItem = (field, item) => {
    setData(prev => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item],
      };
    });
  };

  const goNext = () => {
    if (!isStepValid(step, data)) return;
    setDir(1);
    setStep(s => s + 1);
  };

  const goBack = () => {
    setDir(-1);
    setStep(s => s - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          user_name:  data.name,
          user_email: data.email,
          message:    buildEmailMessage(data),
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Something went wrong. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const firstName = data.name.trim().split(' ')[0] || 'there';

  if (submitted) {
    return <SuccessScreen firstName={firstName} />;
  }

  return (
    <WizardWrapper>
      <ProgressBar step={step} />

      <StepArea>
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ width: '100%' }}
          >
            {step === 1 && <Step1 data={data} set={set} />}
            {step === 2 && <Step2 data={data} set={set} />}
            {step === 3 && <Step3 data={data} set={set} toggleArrayItem={toggleArrayItem} />}
            {step === 4 && <Step4 data={data} set={set} toggleArrayItem={toggleArrayItem} />}
            {step === 5 && <Step5 data={data} set={set} toggleArrayItem={toggleArrayItem} />}
          </motion.div>
        </AnimatePresence>
      </StepArea>

      {error && <ErrorBanner>{error}</ErrorBanner>}

      <NavRow>
        <BackBtn onClick={goBack} disabled={step === 1} aria-label="Go back">
          <FaArrowLeft />
          Back
        </BackBtn>
        {step < TOTAL_STEPS ? (
          <NextBtn
            onClick={goNext}
            disabled={!isStepValid(step, data)}
            aria-label="Continue to next step"
          >
            Next
            <FaArrowRight />
          </NextBtn>
        ) : (
          <SubmitBtn
            onClick={handleSubmit}
            disabled={isSubmitting}
            aria-label="Submit and book a call"
          >
            {isSubmitting ? (
              <>
                <SpinnerRing />
                Sending…
              </>
            ) : (
              <>
                Book a Call
                <FaCheck />
              </>
            )}
          </SubmitBtn>
        )}
      </NavRow>
    </WizardWrapper>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step }) {
  return (
    <ProgressWrapper role="list" aria-label="Wizard progress">
      {STEP_LABELS.map((label, idx) => {
        const num       = idx + 1;
        const completed = num < step;
        const active    = num === step;
        return (
          <React.Fragment key={num}>
            {idx > 0 && (
              <ProgressLine $filled={completed} aria-hidden="true" />
            )}
            <ProgressStep role="listitem" aria-current={active ? 'step' : undefined}>
              <ProgressDot $completed={completed} $active={active} aria-hidden="true">
                {completed ? <FaCheck size={10} /> : num}
              </ProgressDot>
              <ProgressLabel $active={active} $completed={completed}>
                {label}
              </ProgressLabel>
            </ProgressStep>
          </React.Fragment>
        );
      })}
    </ProgressWrapper>
  );
}

// ─── Step 1 – About You ───────────────────────────────────────────────────────
function Step1({ data, set }) {
  return (
    <StepContainer>
      <StepHeading>About You</StepHeading>
      <StepSubheading>Let's start with some basic information.</StepSubheading>
      <FieldGroup>
        <FieldLabel htmlFor="wizard-name">
          Full Name <Required>*</Required>
        </FieldLabel>
        <FieldInput
          id="wizard-name"
          type="text"
          placeholder="e.g. Jane Smith"
          value={data.name}
          onChange={e => set('name', e.target.value)}
          autoComplete="name"
          required
        />
      </FieldGroup>
      <FieldGroup>
        <FieldLabel htmlFor="wizard-email">
          Email Address <Required>*</Required>
        </FieldLabel>
        <FieldInput
          id="wizard-email"
          type="email"
          placeholder="e.g. jane@company.com"
          value={data.email}
          onChange={e => set('email', e.target.value)}
          autoComplete="email"
          required
        />
      </FieldGroup>
      <FieldGroup>
        <FieldLabel htmlFor="wizard-company">
          Company / Organization <Optional>(optional)</Optional>
        </FieldLabel>
        <FieldInput
          id="wizard-company"
          type="text"
          placeholder="e.g. Acme Inc."
          value={data.company}
          onChange={e => set('company', e.target.value)}
          autoComplete="organization"
        />
      </FieldGroup>
    </StepContainer>
  );
}

// ─── Step 2 – Project Type ────────────────────────────────────────────────────
function Step2({ data, set }) {
  return (
    <StepContainer>
      <StepHeading>What Are You Building?</StepHeading>
      <StepSubheading>Select the option that best describes your project.</StepSubheading>
      <TypeGrid role="radiogroup" aria-label="Project type">
        {PROJECT_TYPES.map(({ id, icon: Icon, label, sub }) => {
          const selected = data.projectType === id;
          return (
            <TypeCard
              key={id}
              $selected={selected}
              onClick={() => set('projectType', id)}
              role="radio"
              aria-checked={selected}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set('projectType', id); } }}
            >
              <TypeIconWrap $selected={selected}>
                <Icon />
              </TypeIconWrap>
              <TypeCardLabel>{label}</TypeCardLabel>
              <TypeCardSub>{sub}</TypeCardSub>
            </TypeCard>
          );
        })}
      </TypeGrid>
    </StepContainer>
  );
}

// ─── Step 3 – Project Scope ───────────────────────────────────────────────────
function Step3({ data, set }) {
  return (
    <StepContainer>
      <StepHeading>Project Scope</StepHeading>
      <StepSubheading>Help me understand what you need built.</StepSubheading>
      <FieldGroup>
        <FieldLabel htmlFor="wizard-desc">
          Project Description <Required>*</Required>
        </FieldLabel>
        <FieldTextarea
          id="wizard-desc"
          rows={4}
          placeholder="Describe what you want to build, who it's for, and what problem it solves…"
          value={data.description}
          onChange={e => set('description', e.target.value)}
          required
        />
      </FieldGroup>
      <FieldGroup>
        <FieldLabel>Budget Range <Required>*</Required></FieldLabel>
        <PillRow role="radiogroup" aria-label="Budget range">
          {BUDGET_OPTIONS.map(opt => (
            <Pill
              key={opt}
              $active={data.budget === opt}
              onClick={() => set('budget', opt)}
              role="radio"
              aria-checked={data.budget === opt}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set('budget', opt); } }}
            >
              {opt}
            </Pill>
          ))}
        </PillRow>
      </FieldGroup>
      <FieldGroup>
        <FieldLabel>Timeline <Required>*</Required></FieldLabel>
        <PillRow role="radiogroup" aria-label="Timeline">
          {TIMELINE_OPTIONS.map(opt => (
            <Pill
              key={opt}
              $active={data.timeline === opt}
              onClick={() => set('timeline', opt)}
              role="radio"
              aria-checked={data.timeline === opt}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set('timeline', opt); } }}
            >
              {opt}
            </Pill>
          ))}
        </PillRow>
      </FieldGroup>
    </StepContainer>
  );
}

// ─── Step 4 – Key Requirements ────────────────────────────────────────────────
function Step4({ data, set, toggleArrayItem }) {
  return (
    <StepContainer>
      <StepHeading>Key Requirements</StepHeading>
      <StepSubheading>Select every feature or capability your project needs.</StepSubheading>
      <FieldGroup>
        <FieldLabel>Features & Capabilities</FieldLabel>
        <ChipGrid role="group" aria-label="Feature selection">
          {FEATURE_OPTIONS.map(feat => {
            const active = data.features.includes(feat);
            return (
              <Chip
                key={feat}
                $active={active}
                onClick={() => toggleArrayItem('features', feat)}
                role="checkbox"
                aria-checked={active}
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleArrayItem('features', feat); } }}
              >
                {active && <FaCheck size={9} style={{ flexShrink: 0 }} />}
                {feat}
              </Chip>
            );
          })}
        </ChipGrid>
      </FieldGroup>
      <FieldGroup>
        <FieldLabel htmlFor="wizard-tech">
          Technical Notes <Optional>(optional)</Optional>
        </FieldLabel>
        <FieldTextarea
          id="wizard-tech"
          rows={3}
          placeholder="Preferred stack, existing systems to integrate with, specific constraints…"
          value={data.techNotes}
          onChange={e => set('techNotes', e.target.value)}
        />
      </FieldGroup>
    </StepContainer>
  );
}

// ─── Step 5 – Schedule ────────────────────────────────────────────────────────
function Step5({ data, set, toggleArrayItem }) {
  return (
    <StepContainer>
      <StepHeading>Schedule a Call</StepHeading>
      <StepSubheading>Tell me when you're generally available and I'll reach out to confirm.</StepSubheading>
      <FieldGroup>
        <FieldLabel>Preferred Days</FieldLabel>
        <PillRow role="group" aria-label="Preferred days">
          {DAY_OPTIONS.map(day => {
            const active = data.preferredDays.includes(day);
            return (
              <Pill
                key={day}
                $active={active}
                onClick={() => toggleArrayItem('preferredDays', day)}
                role="checkbox"
                aria-checked={active}
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleArrayItem('preferredDays', day); } }}
              >
                {day}
              </Pill>
            );
          })}
        </PillRow>
      </FieldGroup>
      <FieldGroup>
        <FieldLabel>Preferred Time</FieldLabel>
        <PillRow role="radiogroup" aria-label="Preferred time of day">
          {TIME_OPTIONS.map(opt => (
            <Pill
              key={opt}
              $active={data.preferredTime === opt}
              onClick={() => set('preferredTime', data.preferredTime === opt ? '' : opt)}
              role="radio"
              aria-checked={data.preferredTime === opt}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set('preferredTime', data.preferredTime === opt ? '' : opt); } }}
            >
              {opt}
            </Pill>
          ))}
        </PillRow>
      </FieldGroup>
      <FieldGroup>
        <FieldLabel htmlFor="wizard-notes">
          Anything else? <Optional>(optional)</Optional>
        </FieldLabel>
        <FieldTextarea
          id="wizard-notes"
          rows={3}
          placeholder="Specific questions, context, or anything I should know before our call…"
          value={data.additionalNotes}
          onChange={e => set('additionalNotes', e.target.value)}
        />
      </FieldGroup>
    </StepContainer>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────
function SuccessScreen({ firstName }) {
  return (
    <SuccessWrapper
      as={motion.div}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <SuccessOrb>
        <FaCheckCircle size={52} />
      </SuccessOrb>
      <SuccessTitle>You're all set, {firstName}!</SuccessTitle>
      <SuccessBody>
        Your intake form has been received. I'll review your project details and
        follow up within <strong>24 hours</strong> to confirm a time that works for both of us.
      </SuccessBody>
      <SuccessNote>
        Check your inbox — a confirmation copy has been sent to you.
      </SuccessNote>
    </SuccessWrapper>
  );
}

// ─── Keyframes ────────────────────────────────────────────────────────────────
const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const orbPulse = keyframes`
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.05); }
`;


// ─── Styled Components ────────────────────────────────────────────────────────

// Wizard shell
const WizardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: visible;
`;

// ── Progress bar ──
const ProgressWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1.5rem 1.5rem 1.75rem;
  gap: 0;
`;

const ProgressStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  flex-shrink: 0;
  padding: 4px;
`;

const ProgressDot = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.3s ease;

  ${({ $completed }) =>
    $completed &&
    css`
      background: #3498db;
      color: white;
      border: none;
    `}

  ${({ $active }) =>
    $active &&
    css`
      background: #3498db;
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.5);
      box-shadow: inset 0 0 0 2px #3498db;
    `}

  ${({ $completed, $active }) =>
    !$completed &&
    !$active &&
    css`
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.12);
    `}
`;

const ProgressLine = styled.div`
  height: 2px;
  flex: 1;
  min-width: 20px;
  max-width: 60px;
  margin-top: 15px;
  background: ${({ $filled }) =>
    $filled ? '#3498db' : 'rgba(255, 255, 255, 0.1)'};
  transition: background 0.4s ease;
  transform-origin: left;

  @media (min-width: 480px) {
    min-width: 32px;
    max-width: 80px;
  }
`;

const ProgressLabel = styled.span`
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-align: center;
  white-space: nowrap;
  transition: color 0.3s ease;

  color: ${({ $active, $completed }) =>
    $active
      ? '#3498db'
      : $completed
      ? 'rgba(255,255,255,0.65)'
      : 'rgba(255,255,255,0.3)'};

  @media (max-width: 479px) {
    display: none;
  }

  @media (min-width: 480px) {
    font-size: 0.65rem;
  }
`;

// ── Step area ──
const StepArea = styled.div`
  padding: 0 0 0.5rem;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (min-width: 640px) {
    gap: 1.5rem;
  }
`;

const StepHeading = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.25;

  @media (min-width: 640px) {
    font-size: 1.4rem;
  }
`;

const StepSubheading = styled.p`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.55);
  margin: -0.75rem 0 0;
  line-height: 1.5;

  @media (min-width: 640px) {
    font-size: 0.9rem;
  }
`;

// ── Fields ──
const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FieldLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

const Required = styled.span`
  color: #e74c3c;
  margin-left: 2px;
`;

const Optional = styled.span`
  font-weight: 400;
  text-transform: none;
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.75rem;
  margin-left: 4px;
`;

const inputBase = css`
  width: 100%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  font-family: inherit;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.28);
  }

  &:focus {
    border-color: #3498db;
    background: rgba(52, 152, 219, 0.08);
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.18);
  }
`;

const FieldInput = styled.input`
  ${inputBase}
  padding: 0.65rem 0.875rem;
  height: 44px;
`;

const FieldTextarea = styled.textarea`
  ${inputBase}
  padding: 0.7rem 0.875rem;
  resize: vertical;
  line-height: 1.55;
  min-height: 80px;
`;

// ── Project type grid ──
const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  /* Padding gives TypeCard's translateY(-2px) hover room to paint beyond the
     grid boundary. The negative margin cancels the layout-space the padding
     would otherwise add, keeping alignment with surrounding content. */
  overflow: visible;
  padding: 4px;
  margin: -4px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TypeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  padding: 1rem 0.75rem;
  border-radius: 10px;
  border: 1.5px solid
    ${({ $selected }) =>
      $selected ? '#3498db' : 'rgba(255, 255, 255, 0.08)'};
  background: ${({ $selected }) =>
    $selected
      ? 'rgba(52, 152, 219, 0.12)'
      : 'rgba(255, 255, 255, 0.04)'};
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    border-color: ${({ $selected }) =>
      $selected ? '#3498db' : 'rgba(255, 255, 255, 0.2)'};
    background: ${({ $selected }) =>
      $selected
        ? 'rgba(52, 152, 219, 0.15)'
        : 'rgba(255, 255, 255, 0.07)'};
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }
`;

const TypeIconWrap = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  background: ${({ $selected }) =>
    $selected
      ? 'linear-gradient(135deg, rgba(52,152,219,0.3), rgba(155,89,182,0.3))'
      : 'rgba(255,255,255,0.07)'};
  color: ${({ $selected }) => ($selected ? '#3498db' : 'rgba(255,255,255,0.55)')};
  transition: all 0.2s ease;

  ${TypeCard}:hover & {
    color: ${({ $selected }) => ($selected ? '#3498db' : 'rgba(255,255,255,0.8)')};
  }
`;

const TypeCardLabel = styled.span`
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.2;
`;

const TypeCardSub = styled.span`
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.38);
  line-height: 1.3;
`;

// ── Pills ──
const PillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Pill = styled.div`
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  border: 1.5px solid
    ${({ $active }) =>
      $active ? '#3498db' : 'rgba(255, 255, 255, 0.12)'};
  background: ${({ $active }) =>
    $active
      ? 'rgba(52, 152, 219, 0.2)'
      : 'rgba(255, 255, 255, 0.05)'};
  color: ${({ $active }) => ($active ? '#5dade2' : 'rgba(255,255,255,0.65)')};
  transition: all 0.18s ease;

  &:hover {
    border-color: ${({ $active }) =>
      $active ? '#3498db' : 'rgba(255,255,255,0.25)'};
    background: ${({ $active }) =>
      $active ? 'rgba(52,152,219,0.28)' : 'rgba(255,255,255,0.09)'};
    color: ${({ $active }) => ($active ? '#5dade2' : 'rgba(255,255,255,0.85)')};
  }

  &:focus-visible {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }
`;

// ── Feature chips ──
const ChipGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  border: 1.5px solid
    ${({ $active }) =>
      $active ? 'rgba(52,152,219,0.6)' : 'rgba(255,255,255,0.1)'};
  background: ${({ $active }) =>
    $active
      ? 'rgba(52, 152, 219, 0.15)'
      : 'rgba(255, 255, 255, 0.04)'};
  color: ${({ $active }) => ($active ? '#5dade2' : 'rgba(255,255,255,0.6)')};
  transition: all 0.18s ease;

  &:hover {
    border-color: ${({ $active }) =>
      $active ? 'rgba(52,152,219,0.8)' : 'rgba(255,255,255,0.22)'};
    background: ${({ $active }) =>
      $active ? 'rgba(52,152,219,0.22)' : 'rgba(255,255,255,0.08)'};
    color: ${({ $active }) => ($active ? '#5dade2' : 'rgba(255,255,255,0.85)')};
  }

  &:focus-visible {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }
`;

// ── Navigation ──
const ErrorBanner = styled.div`
  margin: 0.5rem 0;
  padding: 0.65rem 1rem;
  border-radius: 8px;
  background: rgba(231, 76, 60, 0.15);
  border: 1px solid rgba(231, 76, 60, 0.35);
  color: #e74c3c;
  font-size: 0.83rem;
  line-height: 1.45;
`;

const NavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.25rem;
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  gap: 0.75rem;
`;

const navBtnBase = css`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
  user-select: none;
  min-height: 42px;

  &:focus-visible {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.38;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const BackBtn = styled.button`
  ${navBtnBase}
  background: transparent;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.7);

  &:hover:not(:disabled) {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.06);
    color: white;
  }
`;

const NextBtn = styled.button`
  ${navBtnBase}
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  margin-left: auto;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #2eaadc, #2471a3);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.38);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const SubmitBtn = styled.button`
  ${navBtnBase}
  background: #3498db;
  color: white;
  border: 2px solid #3498db;
  margin-left: auto;
  padding: 0.625rem 1.5rem;
  border-radius: 30px;

  &:hover:not(:disabled) {
    background: transparent;
    color: #3498db;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const SpinnerRing = styled.span`
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  flex-shrink: 0;
`;

// ── Success screen ──
const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 1rem;
  gap: 1.25rem;

  @media (min-width: 640px) {
    padding: 3.5rem 2rem;
  }
`;

const SuccessOrb = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(52,152,219,0.25), rgba(155,89,182,0.25));
  border: 1.5px solid rgba(52, 152, 219, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3498db;
  animation: ${orbPulse} 2.5s ease-in-out infinite;
  flex-shrink: 0;
`;

const SuccessTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.2;

  @media (min-width: 640px) {
    font-size: 1.9rem;
  }
`;

const SuccessBody = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.65;
  margin: 0;
  max-width: 420px;

  strong {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
  }
`;

const SuccessNote = styled.p`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);
  margin: 0;
  line-height: 1.5;
`;

export default ClientIntakeWizard;
