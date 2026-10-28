import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import styles from './Contact.module.css';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function Contact() {
  useDocumentHead('Contato', 'Fale com o time do Simplify: dúvidas, sugestões e feedback.');

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const isConfigured = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isConfigured) {
      toast.error('O envio de e-mail não está configurado neste ambiente.');
      return;
    }

    setLoading(true);
    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: formData.name, reply_to: formData.email, message: formData.message },
        EMAILJS_PUBLIC_KEY,
      );
      toast.success('Mensagem enviada com sucesso!');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      toast.error('Não foi possível enviar a mensagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${styles.page}`}>
      <h1>Entre em contato</h1>
      <p>Tem dúvidas ou sugestões? Fale com a gente!</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Seu nome"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
        <Input
          label="Seu e-mail"
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
        <div className={styles.field}>
          <label htmlFor="message">Mensagem</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>
    </div>
  );
}
