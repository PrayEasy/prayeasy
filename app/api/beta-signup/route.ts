import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

async function sendWelcomeEmail(firstName: string, email: string) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.warn('RESEND_API_KEY not configured - skipping email')
    return { success: false, reason: 'no_api_key' }
  }

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f0f9ff;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background-color:#ffffff;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#007FFF 0%,#4A90E2 50%,#87CEEB 100%);padding:40px 30px;text-align:center;border-radius:0 0 24px 24px;">
      <div style="font-size:48px;margin-bottom:8px;">🙏</div>
      <h1 style="color:#ffffff;font-size:28px;margin:0;font-weight:700;">Welcome to PrayEasy!</h1>
      <p style="color:#e0f3fe;font-size:16px;margin-top:8px;">Your AI-Powered Prayer Companion</p>
    </div>

    <!-- Body -->
    <div style="padding:32px 30px;">
      <p style="font-size:18px;color:#1a1a1a;margin-top:0;">Hi ${firstName},</p>
      
      <p style="font-size:16px;color:#444;line-height:1.6;">
        Thank you for joining PrayEasy! We're excited to have you as part of our growing prayer community.
      </p>
      
      <p style="font-size:16px;color:#444;line-height:1.6;">
        PrayEasy is your AI-powered prayer companion, featuring <strong>Pastor Hope</strong>, daily devotionals, Bible study, and a global prayer community.
      </p>

      <!-- CTA Button -->
      <div style="text-align:center;margin:32px 0;">
        <a href="https://prayeasy.onrender.com" style="display:inline-block;background:linear-gradient(135deg,#007FFF,#4A90E2);color:#ffffff;font-size:18px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:12px;box-shadow:0 4px 15px rgba(0,127,255,0.3);">Try PrayEasy Now →</a>
      </div>

      <!-- Features -->
      <div style="background-color:#f0f9ff;border-radius:16px;padding:24px;margin:24px 0;">
        <p style="font-size:16px;font-weight:600;color:#1a1a1a;margin-top:0;">What's Next:</p>
        <ul style="font-size:15px;color:#444;line-height:2;padding-left:20px;margin-bottom:0;">
          <li>💬 Explore <strong>Pastor Hope</strong> (AI prayer companion)</li>
          <li>☀️ Read today's <strong>devotional</strong></li>
          <li>🌍 Join our <strong>global prayer map</strong></li>
          <li>📓 Start your <strong>prayer journal</strong></li>
        </ul>
      </div>

      <p style="font-size:16px;color:#444;line-height:1.6;">
        We'll keep you updated on our Beta launch and new features!
      </p>

      <p style="font-size:16px;color:#444;line-height:1.6;margin-bottom:0;">
        Blessings,<br/>
        <strong>Roman from PrayEasy</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color:#f8fafc;padding:24px 30px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="font-size:13px;color:#94a3b8;margin:0;">© 2026 PrayEasy. All rights reserved.</p>
      <p style="font-size:13px;color:#94a3b8;margin:8px 0 0;">
        <a href="https://prayeasy.onrender.com" style="color:#007FFF;text-decoration:none;">prayeasy.onrender.com</a>
      </p>
    </div>
  </div>
</body>
</html>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Roman from PrayEasy <onboarding@resend.dev>',
        reply_to: 'roman@prayeasy.ai',
        to: [email],
        subject: 'Welcome to PrayEasy! 🙏',
        html: htmlBody,
      }),
    })

    const result = await res.json()
    if (!res.ok) {
      console.error('Resend API error:', result)
      return { success: false, reason: 'api_error', details: result }
    }
    console.log('Welcome email sent to:', email, 'ID:', result.id)
    return { success: true, id: result.id }
  } catch (err) {
    console.error('Email send error:', err)
    return { success: false, reason: 'exception' }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { first_name, last_name, email, phone, interested_in_beta, source } = body

    // Validate required fields
    if (!first_name?.trim() || !last_name?.trim()) {
      return NextResponse.json({ error: 'First and last name are required.' }, { status: 400 })
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
    }
    const phoneDigits = (phone || '').replace(/\D/g, '')
    if (phoneDigits.length < 10) {
      return NextResponse.json({ error: 'A valid phone number is required.' }, { status: 400 })
    }

    // Save to Supabase
    const supabase = getSupabaseClient()
    if (!supabase) {
      console.error('CRITICAL: Supabase client is null - missing env vars')
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    const { data, error: dbError } = await supabase
      .from('event_signups')
      .insert([{
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone,
        interested_in_beta: interested_in_beta || false,
        source: source || 'Website',
      }])
      .select()

    if (dbError) {
      console.error('Supabase insert error:', dbError.code, dbError.message, dbError.details)
      // Don't fail the signup if it's a duplicate
      if (dbError.code === '23505') {
        // Duplicate email - still send email and show success
        console.log('Duplicate email signup:', email)
      } else {
        return NextResponse.json({ error: 'Failed to save signup. Please try again.' }, { status: 500 })
      }
    } else {
      console.log('Signup saved:', data?.[0]?.id, email)
    }

    // Send welcome email (non-blocking - don't fail signup if email fails)
    const emailResult = await sendWelcomeEmail(first_name.trim(), email.trim().toLowerCase())
    console.log('Email result:', emailResult)

    return NextResponse.json({
      success: true,
      message: 'Welcome to PrayEasy!',
      emailSent: emailResult.success,
    })
  } catch (err) {
    console.error('Beta signup error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
