import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { Mail, Lock, User, ArrowLeft, AlertCircle } from 'lucide-react';
import { authService } from '../services/auth';

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const customHandleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        // Simulate a slight delay for better UX
        setTimeout(() => {
            try {
                authService.signup({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                });
                // Auto-login after signup
                authService.login(formData.email, formData.password);
                navigate('/dashboard');
            } catch (err) {
                setError(err.message || 'Failed to create account');
            } finally {
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.15), transparent)' }}>
            <div style={{ width: '100%', maxWidth: '480px', padding: 'var(--spacing-md)' }}>
                <button
                    onClick={() => navigate('/')}
                    style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)', fontSize: '0.875rem' }}
                >
                    <ArrowLeft size={16} /> Back to Home
                </button>

                <Card className="animate-fade-in">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                        <h2 className="text-gradient" style={{ fontSize: '2rem' }}>Create Account</h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Join us and build the future today</p>
                    </div>

                    {error && (
                        <div style={{ padding: 'var(--spacing-sm) var(--spacing-md)', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={customHandleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            icon={User}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
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
                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="••••••••"
                            icon={Lock}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                        />

                        <Button type="submit" size="lg" isLoading={loading} style={{ marginTop: 'var(--spacing-sm)' }}>
                            Create Account
                        </Button>
                    </form>

                    <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--color-accent-primary)', fontWeight: '600' }}>Sign in</Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Signup;
