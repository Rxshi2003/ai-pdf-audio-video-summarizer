import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { ArrowRight, FileText, Video, Brain, Search } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Hero Section */}
            <header style={{
                padding: 'var(--spacing-2xl) var(--spacing-md)',
                textAlign: 'center',
                background: 'radial-gradient(circle at top center, rgba(99, 102, 241, 0.15), transparent 70%)'
            }}>
                <div className="container animate-fade-in">
                    <div style={{ marginBottom: 'var(--spacing-md)', display: 'inline-block', padding: '4px 12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', color: 'var(--color-accent-primary)' }}>
                        AI-Powered Intelligence
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: 'var(--spacing-lg)', letterSpacing: '-0.02em' }}>
                        Unlock Knowledge from<br /> Documents & Multimedia.
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto var(--spacing-2xl)', lineHeight: '1.6' }}>
                        Upload PDFs, videos, or audio files and ask questions in natural language. Get instant, accurate answers powered by advanced AI.
                    </p>
                    <div className="flex-center" style={{ gap: 'var(--spacing-md)' }}>
                        <Button size="lg" onClick={() => navigate('/login')}>
                            Sign In <ArrowRight size={18} />
                        </Button>
                        <Button variant="secondary" size="lg" onClick={() => navigate('/signup')}>
                            Sign Up
                        </Button>
                    </div>
                </div>
            </header>

            {/* Features Grid */}
            <section className="container" style={{ padding: 'var(--spacing-2xl) var(--spacing-md)', flex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
                    <Card hoverEffect>
                        <div style={{ color: 'var(--color-accent-primary)', marginBottom: 'var(--spacing-md)' }}>
                            <FileText size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-sm)' }}>Document & PSD Analysis</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Deep dive into PDFs and PSD designs. Extract insights, layer details, and summaries instantly.
                        </p>
                    </Card>
                    <Card hoverEffect>
                        <div style={{ color: 'var(--color-accent-secondary)', marginBottom: 'var(--spacing-md)' }}>
                            <Video size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-sm)' }}>Multimedia Q&A</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Don't just watch, interact. Query content from videos and audio files with precise timestamped answers.
                        </p>
                    </Card>
                    <Card hoverEffect>
                        <div style={{ color: '#10b981', marginBottom: 'var(--spacing-md)' }}>
                            <Brain size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-sm)' }}>Contextual AI</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Our AI understands context across multiple files, providing comprehensive answers to complex queries.
                        </p>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: '1px solid var(--color-border)', padding: 'var(--spacing-xl) var(--spacing-md)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                <p>&copy; 2024 AI Q&A Platform. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;
