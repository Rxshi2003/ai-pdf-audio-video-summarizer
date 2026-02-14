import React, { useState, useRef } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import ChatBot from '../components/ChatBot';
import { useNavigate } from 'react-router-dom';
import { LogOut, Upload, FileText, Video, Music, X, Check, AlertCircle, Image as ImageIcon, User } from 'lucide-react';
import { authService } from '../services/auth';
import { useEffect } from 'react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [files, setFiles] = useState([]); // Stores metadata and some status
    const [rawFiles, setRawFiles] = useState({}); // Mapping from file id to original File object
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            navigate('/login');
        } else {
            setUser(currentUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        addFiles(droppedFiles);
    };

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        addFiles(selectedFiles);
    };

    const addFiles = (newFiles) => {
        const processedFiles = newFiles.map(file => {
            const id = Math.random().toString(36).substr(2, 9);
            // Store the raw File object for API analysis
            setRawFiles(prev => ({ ...prev, [id]: file }));

            return {
                id,
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                type: file.type,
                status: 'uploading',
                progress: 0
            };
        });

        setFiles(prev => [...processedFiles, ...prev]);

        processedFiles.forEach(file => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setFiles(currentFiles =>
                        currentFiles.map(f => f.id === file.id ? { ...f, status: 'ready', progress: 100 } : f)
                    );
                } else {
                    setFiles(currentFiles =>
                        currentFiles.map(f => f.id === file.id ? { ...f, progress: Math.floor(progress) } : f)
                    );
                }
            }, 300);
        });
    };

    const removeFile = (id) => {
        setFiles(files.filter(f => f.id !== id));
        setRawFiles(prev => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        });
    };

    const getFileIcon = (type) => {
        if (type.includes('pdf')) return <FileText size={24} color="#ef4444" />;
        if (type.includes('video')) return <Video size={24} color="#6366f1" />;
        if (type.includes('audio')) return <Music size={24} color="#10b981" />;
        if (type.includes('photoshop') || type.includes('psd') || type.includes('image')) return <ImageIcon size={24} color="#31a8ff" />;
        return <FileText size={24} color="var(--color-text-muted)" />;
    };

    const readyRawFiles = files
        .filter(f => f.status === 'ready')
        .map(f => rawFiles[f.id])
        .filter(Boolean);

    return (
        <div className="dashboard-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', height: '100vh', overflow: 'hidden' }}>
            <style>
                {`
                @media (max-width: 1024px) {
                    .dashboard-layout {
                        grid-template-columns: 1fr !important;
                    }
                    .chatbot-pane {
                        display: none; /* In a real app, we'd add a toggle for mobile */
                    }
                }
                `}
            </style>
            {/* Left Content: Workspace */}
            <div style={{ overflowY: 'auto', padding: 'var(--spacing-xl) var(--spacing-2xl)', background: 'var(--color-bg-primary)' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem' }}>Workspace</h1>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Manage your knowledge base files for AI analysis.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                            <div style={{ width: '32px', height: '32px', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-primary)' }}>
                                <User size={18} />
                            </div>
                            <span>{user?.name || 'User'}</span>
                        </div>
                        <Button variant="secondary" onClick={handleLogout}>
                            <LogOut size={18} /> Sign Out
                        </Button>
                    </div>
                </header>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2xl)' }}>
                    {/* Upload Area */}
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current.click()}
                        style={{
                            border: `2px dashed ${isDragging ? 'var(--color-accent-primary)' : 'var(--color-border)'}`,
                            borderRadius: 'var(--radius-lg)',
                            padding: 'var(--spacing-2xl)',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: isDragging ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255, 255, 255, 0.01)',
                            transition: 'all var(--transition-normal)',
                            position: 'relative'
                        }}
                    >
                        <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple style={{ display: 'none' }} accept=".pdf,video/*,audio/*,.psd,image/*" />
                        <div className="flex-center" style={{ width: '64px', height: '64px', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-full)', margin: '0 auto var(--spacing-md)', color: 'var(--color-accent-primary)' }}>
                            <Upload size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-xs)' }}>Upload Documents, Media & PSDs</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>PDF, PSD, Video, or Audio (Max 50MB)</p>
                    </div>

                    {/* Files List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
                            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Recent Uploads</h2>
                            {files.length > 0 && (
                                <button
                                    onClick={() => { setFiles([]); setRawFiles({}); }}
                                    style={{ color: 'var(--color-error)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: 'var(--radius-sm)', transition: 'background 0.2s' }}
                                    onMouseEnter={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.1)'}
                                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                >
                                    Clear All
                                </button>
                            )}
                        </div>
                        {files.length === 0 ? (
                            <Card style={{ textAlign: 'center', padding: 'var(--spacing-2xl)', color: 'var(--color-text-muted)' }}>
                                <AlertCircle size={48} style={{ margin: '0 auto var(--spacing-md)', opacity: 0.5 }} />
                                <p>No files uploaded yet.</p>
                            </Card>
                        ) : (
                            files.map(file => (
                                <Card key={file.id} style={{ padding: 'var(--spacing-md)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                        <div style={{ padding: 'var(--spacing-sm)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                            {getFileIcon(file.type || file.name)}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <h4 style={{ fontSize: '1rem', margin: 0, color: 'var(--color-text-primary)' }}>{file.name}</h4>
                                                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{file.size}</span>
                                            </div>
                                            {file.status === 'uploading' ? (
                                                <div style={{ width: '100%', height: '4px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                                                    <div style={{ width: `${file.progress}%`, height: '100%', background: 'var(--color-accent-primary)', transition: 'width 0.3s ease' }}></div>
                                                </div>
                                            ) : (
                                                <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <Check size={12} /> Ready for analysis
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                                            style={{ color: 'var(--color-text-muted)', padding: '4px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Right Pane: AI Chatbot */}
            <div className="chatbot-pane" style={{ height: '100%', overflow: 'hidden' }}>
                <ChatBot contextFiles={readyRawFiles} />
            </div>
        </div>
    );
};

export default Dashboard;
