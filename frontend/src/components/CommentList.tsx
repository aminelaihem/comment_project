import { useEffect, useState } from 'react';
import {
    List,
    Paper,
    Typography,
    Avatar,
    Box,
    Fade
} from '@mui/material';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import axios from 'axios';
import type { Comment } from '../types';

interface CommentListProps {
    postId: number;
    refreshTrigger: number;
}

export const CommentList = ({ postId, refreshTrigger }: CommentListProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/comments/`);
                setComments(response.data);
                setError('');
            } catch (err) {
                setError('Impossible de se connecter au serveur. Vérifiez que le serveur Django est en cours d\'exécution.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchComments();
    }, [postId, refreshTrigger]);

    if (isLoading) {
        return (
            <Paper elevation={0} sx={{ p: 3, display: 'flex', justifyContent: 'center', minHeight: 120, mt: 4, borderRadius: 5, background: 'rgba(255,255,255,0.35)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(255,255,255,0.25)' }}>
                <Fade in={true}>
                    <Typography color="primary" fontWeight={600}>Chargement des commentaires...</Typography>
                </Fade>
            </Paper>
        );
    }

    if (error) {
        return (
            <Paper elevation={0} sx={{ p: 3, mt: 4, borderRadius: 5, background: 'rgba(255,255,255,0.35)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(255,255,255,0.25)' }}>
                <Typography color="error">
                    {error}
                </Typography>
            </Paper>
        );
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'primary.main', letterSpacing: 1 }}>
                Commentaires ({comments.length})
            </Typography>
            <List sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {comments.length === 0 ? (
                    <Fade in={true}>
                        <Paper elevation={0} sx={{ p: 2, textAlign: 'center', borderRadius: 3, background: 'rgba(255,255,255,0.45)', boxShadow: '0 2px 8px #0001', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,0.18)' }}>
                            <Typography color="text.secondary">Soyez le premier à commenter !</Typography>
                        </Paper>
                    </Fade>
                ) : comments.map((comment) => (
                    <Fade in={true} key={comment.id}>
                        <Paper
                            elevation={3}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                gap: 2,
                                px: 3, py: 2,
                                borderRadius: 4,
                                background: '#fff',
                                boxShadow: '0 4px 24px 0 rgba(123,47,242,0.07)',
                                mb: 1,
                                width: '100%',
                                maxWidth: 600,
                                mx: 'auto',
                                position: 'relative',
                                transition: 'box-shadow 0.35s cubic-bezier(.4,0,.2,1), transform 0.35s cubic-bezier(.4,0,.2,1)',
                                '&:hover': { transform: 'scale(1.02)', boxShadow: '0 6px 18px 0 rgba(123,47,242,0.10)' },
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: '#fff',
                                    fontWeight: 700,
                                    fontSize: 22,
                                    width: 48,
                                    height: 48,
                                    mr: 2,
                                }}
                            >
                                {comment.author[0]?.toUpperCase()}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.5 }}>
                                    <Typography variant="subtitle1" fontWeight={700} sx={{ color: 'primary.main' }}>
                                        {comment.author}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {format(new Date(comment.created_at), 'PPp', { locale: fr })}
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1.08rem', color: 'text.primary', textAlign: 'left', width: '100%' }}>
                                    {comment.content}
                                </Typography>
                            </Box>
                        </Paper>
                    </Fade>
                ))}
            </List>
        </Box>
    );
}; 