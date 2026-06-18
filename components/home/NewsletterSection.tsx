import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            اشتركي في نشرتنا البريدية
          </h2>
          <p className="text-white/80 mb-8">
            احصلي على أحدث العروض والخصومات الحصرية مباشرة في بريدك الإلكتروني
          </p>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              type="email"
              placeholder="أدخلي بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white"
              required
            />
            <Button type="submit" variant="secondary" size="md">
              اشتراك
            </Button>
          </form>
          <p className="text-white/60 text-sm mt-4">
            نحن نحترم خصوصيتك ولن نشارك بريدك الإلكتروني مع أي طرف ثالث
          </p>
        </div>
      </div>
    </section>
  );
};
