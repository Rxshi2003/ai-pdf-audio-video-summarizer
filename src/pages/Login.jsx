import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { Mail, Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import { authService } from '../services/auth';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '' });

    const customHandleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            try {
                authService.login(formData.email, formData.password);
                navigate('/dashboard');
            } catch (err) {
                setError(err.message || 'Invalid email or password');
            } finally {
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', background: 'radial-gradient(circle at center, rgba(28, 28, 46, 0.5), transparent)' }}>
            <div style={{ width: '100%', maxWidth: '420px', padding: 'var(--spacing-md)' }}>
                <button
                    onClick={() => navigate('/')}
                    style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)', fontSize: '0.875rem' }}
                >
                    <ArrowLeft size={16} /> Back to Home
                </button>

                <Card className="animate-fade-in">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                        <h2 className="text-gradient" style={{ fontSize: '2rem' }}>Welcome Back</h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Enter your credentials to access your account</p>
                    </div>

                    {error && (
                        <div style={{ padding: 'var(--spacing-sm) var(--spacing-md)', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={customHandleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@example.com"
                            icon={Mail}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            icon={Lock}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                                <input type="checkbox" style={{ accentColor: 'var(--color-accent-primary)' }} /> Remember me
                            </label>
                            <a href="#" style={{ color: 'var(--color-accent-primary)' }}>Forgot Password?</a>
                        </div>

                        <Button type="submit" size="lg" isLoading={loading} style={{ marginTop: 'var(--spacing-sm)' }}>
                            Sign In
                        </Button>
                    </form>

                    <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                        Don't have an account? <Link to="/signup" style={{ color: 'var(--color-accent-primary)', fontWeight: '600' }}>Sign up</Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
