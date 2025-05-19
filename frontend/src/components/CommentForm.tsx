import { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Paper,
    Typography,
    Snackbar,
    Alert,
    CircularProgress,
    Fade
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

interface CommentFormProps {
    postId: number;
    onCommentAdded: () => void;
}

export const CommentForm = ({ postId, onCommentAdded }: CommentFormProps) => {
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('http://127.0.0.1:8000/api/comments/', {
                content,
                author,
                post_id: postId
            });
            setContent('');
            setAuthor('');
            setSuccess(true);
            onCommentAdded();
        } catch (err: any) {
            setError("Erreur lors de l'ajout du commentaire : " + (err?.message || ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fade in={true}>
            <Paper elevation={3} sx={{
                p: { xs: 2, md: 4 },
                mb: 4,
                borderRadius: 5,
                background: '#fff',
                boxShadow: '0 4px 24px 0 rgba(123,47,242,0.07)',
                maxWidth: 600,
                mx: 'auto',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <Typography variant="h5" align="center" sx={{ fontWeight: 700, mb: 2, color: 'primary.main', letterSpacing: 1 }}>
                    Ajouter un commentaire
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Votre nom"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        margin="normal"
                        required
                        variant="outlined"
                        sx={{
                            borderRadius: 3,
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                fontWeight: 600,
                                fontSize: '1.08rem',
                                background: '#fafbfc',
                                padding: '12px',
                                transition: 'border-color 0.2s',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused': {
                                borderColor: '#7b2ff2',
                                boxShadow: 'none',
                                background: '#fff',
                            },
                            '& .MuiInputLabel-root': {
                                fontWeight: 500,
                                color: '#888',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#7b2ff2',
                            },
                        }}
                        InputLabelProps={{ style: { fontWeight: 500 } }}
                    />
                    <TextField
                        fullWidth
                        label="Votre commentaire"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        margin="normal"
                        required
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{
                            borderRadius: 3,
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                fontWeight: 500,
                                fontSize: '1.08rem',
                                background: '#fafbfc',
                                padding: '12px',
                                transition: 'border-color 0.2s',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused': {
                                borderColor: '#7b2ff2',
                                boxShadow: 'none',
                                background: '#fff',
                            },
                            '& .MuiInputLabel-root': {
                                fontWeight: 500,
                                color: '#888',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#7b2ff2',
                            },
                        }}
                        InputLabelProps={{ style: { fontWeight: 500 } }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            endIcon={<SendIcon />}
                            disabled={loading}
                            sx={{
                                minWidth: 160,
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                borderRadius: 99,
                                px: 4,
                                py: 1.2,
                                boxShadow: '0 2px 12px #7b2ff255',
                                transition: 'all 0.2s',
                                letterSpacing: 1,
                                '&:hover': { transform: 'scale(1.04)', boxShadow: '0 4px 18px #7b2ff299' },
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Publier'}
                        </Button>
                    </Box>
                </Box>
                <Snackbar
                    open={success}
                    autoHideDuration={3000}
                    onClose={() => setSuccess(false)}
                >
                    <Alert severity="success">
                        Commentaire ajouté avec succès !
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={!!error}
                    autoHideDuration={5000}
                    onClose={() => setError('')}
                >
                    <Alert severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            </Paper>
        </Fade>
    );
}; 