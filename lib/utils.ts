export function whatsappHref(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/918861098210?text=${encoded}`;
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
