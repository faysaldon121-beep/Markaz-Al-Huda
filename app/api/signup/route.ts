import { NextRequest, NextResponse } from 'next/server';

const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY!;
const ADMIN_EMAIL = 'Arishere93@gmail.com';

async function sendEmail(subject: string, to: string, message: string) {
  await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject,
      to,
      message,
      from_name: 'Markaz ul Huda Website',
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, cnic, city, courseInterest } = body;

    if (!name || !email || !phone || !cnic) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Email to admin
    await sendEmail(
      `🆕 New Student Registration: ${name}`,
      ADMIN_EMAIL,
      `New student signed up at Markaz ul Huda:

Name: ${name}
Email: ${email}
Phone: ${phone}
CNIC: ${cnic}
City: ${city || 'Not provided'}
Course Interest: ${courseInterest || 'Not selected'}

ACTION REQUIRED: Review and approve this student's account, then send them login credentials.`
    );

    // Confirmation to student
    await sendEmail(
      'Registration Received — Markaz ul Huda',
      email,
      `As-salamu alaykum ${name},

Thank you for registering at Markaz ul Huda. We have received your application.

Your Details:
- Name: ${name}
- Email: ${email}
- Course: ${courseInterest || 'To be discussed'}

You will receive an email with your login details once your account is approved (usually within 24–48 hours).

For questions: +92 344 1722419 (Qari Abdur Rahman Al Afin)

JazakAllah Khair,
Markaz ul Huda, Kot Abdullah, Qasoor`
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
