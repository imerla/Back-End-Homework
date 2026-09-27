// იგივე წესები, რაც backend-ის DTO-ებშია
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateFullName(v: string) {
  if (!v.trim()) return "სახელი სავალდებულოა";
  if (v.length > 25) return "სახელი მაქსიმუმ 25 სიმბოლო";
  return null;
}

export function validateEmail(v: string) {
  if (!v.trim()) return "ელფოსტა სავალდებულოა";
  if (!EMAIL_RE.test(v)) return "ელფოსტა არასწორია";
  return null;
}

export function validatePassword(v: string) {
  if (!v) return "პაროლი სავალდებულოა";
  if (v.length < 6 || v.length > 20) return "პაროლი უნდა იყოს 6-დან 20 სიმბოლომდე";
  return null;
}
