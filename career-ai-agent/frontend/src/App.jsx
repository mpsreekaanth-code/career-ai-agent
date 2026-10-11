import { useMemo, useState } from "react";
import {
  FileText, BriefcaseBusiness, GraduationCap, Mail, Send,
  Sparkles, Download, Copy, RotateCcw, Check, LoaderCircle,
  ShieldCheck, WandSparkles, FileUser
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.PROD ? "" : "http://localhost:5000");

const documentTypes = [
  { id: "resume", label: "Resume", desc: "A concise, job-focused resume", icon: FileUser },
  { id: "cv", label: "CV", desc: "A detailed professional or academic CV", icon: GraduationCap },
  { id: "cover-letter", label: "Cover letter", desc: "Tailored to a role or company", icon: BriefcaseBusiness },
  { id: "formal-letter", label: "Formal letter", desc: "Professional requests and correspondence", icon: Mail },
  { id: "application-letter", label: "Application letter", desc: "Internship, leave, scholarship, and more", icon: FileText }
];

const examples = {
  resume: "Name: [Your full name]\\nTarget role: Junior Web Developer\\nLocation: [City, Country]\\nEmail: [Email]\\nPhone: [Phone]\\nEducation: [Degree, institution, graduation year]\\nSkills: [List your real skills]\\nExperience/internship: [Company, role, dates, tasks]\\nProjects: [Project name, technologies, what you built]\\nCertifications/achievements: [If any]",
  cv: "Full name: [Name]\\nContact: [Email, phone, location, portfolio]\\nProfessional/academic profile: [Short summary]\\nEducation: [Degrees, institutions, years]\\nExperience: [Roles, organizations, dates, responsibilities]\\nProjects/research/publications: [If applicable]\\nSkills: [Real skills]\\nCertifications/awards: [If any]",
  "cover-letter": "Your name: [Name]\\nRole: [Job title]\\nCompany: [Company name]\\nWhy you want this role: [Reason]\\nRelevant experience/projects: [Real examples]\\nRelevant skills: [Skills you have]\\nContact details: [Email/phone]",
  "formal-letter": "Purpose of the letter: [Explain what you need]\\nTo: [Recipient name/designation/organization]\\nFrom: [Your name and role, if relevant]\\nImportant details: [Dates, reference number, context]\\nPreferred outcome: [What you are requesting]",
  "application-letter": "Application type: [Internship/job/scholarship/leave/other]\\nTo: [Recipient/organization]\\nYour details: [Name, course/role, institution]\\nReason for applying: [Reason]\\nRelevant background: [Real skills, achievements, circumstances]\\nDates or other details: [If applicable]"
};

export default function App() {
  const [type, setType] = useState("resume");
  const [details, setDetails] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tone, setTone] = useState("professional");
  const [document, setDocument] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const selected = useMemo(() => documentTypes.find((item) => item.id === type), [type]);

  function changeType(nextType) {
    setType(nextType);
    setError("");
  }

  async function generateDocument(event) {
    event.preventDefault();
    setError("");
    setDocument("");
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, details, jobDescription, tone })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Unable to generate document.");
      setDocument(data.document || "");
    } catch (err) {
      setError(err.message || "Something went wrong. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  async function copyDocument() {
    try {
      await navigator.clipboard.writeText(document);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setError("Copy was blocked by your browser. Select the document text and copy it manually.");
    }
  }

  function downloadTxt() {
    const blob = new Blob([document], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement("a");
    anchor.href = url;
    anchor.download = `${type}-draft.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function printDocument() {
    window.print();
  }

  function startOver() {
    setDocument("");
    setError("");
  }

  return (
    <div className="app-shell">
      <header className="topbar no-print">
        <a className="brand" href="#" aria-label="CareerAI home">
          <span className="brand-mark"><WandSparkles size={20} /></span>
          <span>Career<span className="brand-accent">AI</span></span>
        </a>
        <div className="topbar-right"><span className="status-dot" /> AI Document Studio</div>
      </header>

      <main className="page-wrap">
        <section className="hero no-print">
          <div className="eyebrow"><Sparkles size={14} /> YOUR PERSONAL WRITING ASSISTANT</div>
          <h1>Professional documents,<br /><span>made simpler.</span></h1>
          <p className="hero-copy">Create a polished resume, CV, cover letter, or formal application in minutes. Tell us the facts — CareerAI helps with the words.</p>
          <div className="trust-row">
            <span><ShieldCheck size={15} /> You stay in control</span>
            <span><FileText size={15} /> Editable drafts</span>
            <span><Download size={15} /> Print or save as PDF</span>
          </div>
        </section>

        <div className={`workspace ${document ? "has-document" : ""}`}>
          <section className="panel input-panel no-print">
            <div className="panel-heading">
              <div>
                <p className="step-label">STEP 01</p>
                <h2>What are we creating?</h2>
              </div>
              <span className="step-icon"><FileText size={19} /></span>
            </div>

            <div className="type-grid">
              {documentTypes.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`type-card ${type === item.id ? "active" : ""}`}
                    onClick={() => changeType(item.id)}
                    aria-pressed={type === item.id}
                  >
                    <span className="type-icon"><Icon size={19} /></span>
                    <span className="type-title">{item.label}</span>
                    <span className="type-desc">{item.desc}</span>
                    {type === item.id && <span className="selected-check"><Check size={13} /></span>}
                  </button>
                );
              })}
            </div>

            <form onSubmit={generateDocument}>
              <div className="field-heading">
                <label htmlFor="details">Tell us the details</label>
                <span>Required</span>
              </div>
              <p className="field-help">Write naturally or use the sample guide below. The agent will organize your information.</p>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={examples[type]}
                rows={9}
                required
                minLength={10}
                maxLength={12000}
              />
              <div className="textarea-footer"><span>Don't know what to write? Use the guide as a checklist.</span><span>{details.length}/12000</span></div>

              {type === "cover-letter" && (
                <div className="field-block">
                  <label htmlFor="jobDescription">Job description <span className="optional">(optional but recommended)</span></label>
                  <textarea id="jobDescription" rows={5} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the job description to tailor the cover letter." maxLength={12000} />
                </div>
              )}

              <div className="field-block">
                <label htmlFor="tone">Writing style</label>
                <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)}>
                  <option value="professional">Professional</option>
                  <option value="formal">Formal and respectful</option>
                  <option value="simple">Simple and clear</option>
                  <option value="confident">Confident and concise</option>
                </select>
              </div>

              {error && <div className="error-box" role="alert">{error}</div>}

              <button className="primary-button" type="submit" disabled={loading || details.trim().length < 10}>
                {loading ? <><LoaderCircle className="spin" size={18} /> Creating your document...</> : <><Sparkles size={18} /> Generate {selected.label}</>}
                {!loading && <Send size={16} />}
              </button>
              <p className="privacy-note"><ShieldCheck size={14} /> Your API key stays on the server. Check your draft before using it.</p>
            </form>
          </section>

          <section className="panel preview-panel">
            <div className="preview-top">
              <div>
                <p className="step-label">STEP 02</p>
                <h2>Your document</h2>
              </div>
              {document && <div className="preview-actions no-print">
                <button type="button" className="icon-button" onClick={copyDocument} title="Copy document">{copied ? <Check size={16} /> : <Copy size={16} />}<span>{copied ? "Copied" : "Copy"}</span></button>
                <button type="button" className="icon-button" onClick={downloadTxt} title="Download text"><Download size={16} /><span>TXT</span></button>
                <button type="button" className="icon-button" onClick={printDocument} title="Print or save as PDF"><Download size={16} /><span>PDF</span></button>
              </div>}
            </div>

            {!document && !loading && (
              <div className="empty-state">
                <div className="empty-illustration">
                  <div className="paper paper-back"></div>
                  <div className="paper paper-front"><span></span><span></span><span></span><span className="short-line"></span><b>✦</b></div>
                </div>
                <h3>Your next opportunity starts here.</h3>
                <p>Choose a document type, add your details, and generate your first draft. It will appear here ready for review.</p>
                <div className="empty-tip"><Sparkles size={15} /> Tip: Specific facts help create stronger documents.</div>
              </div>
            )}

            {loading && <div className="loading-state"><div className="loader-orb"><Sparkles size={25} /></div><h3>Putting your document together</h3><p>Organizing details, improving wording, and checking the structure...</p><div className="loading-bar"><span /></div></div>}

            {document && (
              <div className="document-area">
                <div className="document-toolbar no-print"><span><span className="live-dot" /> Draft ready to review</span><button type="button" onClick={startOver}><RotateCcw size={14} /> Clear draft</button></div>
                <textarea
                  className="document-editor"
                  aria-label="Edit generated document"
                  value={document}
                  onChange={(e) => setDocument(e.target.value)}
                  rows={24}
                  spellCheck="true"
                />
                <div className="review-note no-print"><ShieldCheck size={16} /><span><strong>Before you use it:</strong> Verify all names, dates, qualifications, and claims. Replace any [placeholders]. AI can make mistakes.</span></div>
              </div>
            )}
          </section>
        </div>

        <footer className="footer no-print">
          <span>CareerAI · Document Studio</span>
          <span>Built to help you write with confidence.</span>
        </footer>
      </main>
    </div>
  );
}
