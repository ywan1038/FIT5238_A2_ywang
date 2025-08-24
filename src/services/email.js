// src/services/email.js
import emailjs from '@emailjs/browser'

const SERVICE_ID = 'YOUR_SERVICE_ID'
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

export async function sendEmailWithAttachment(formEl) {
  // 直接把 <form> 传给 emailjs.sendForm，自动处理附件
  return emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formEl, { publicKey: PUBLIC_KEY })
}
