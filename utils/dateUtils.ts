export function convertDate(dateString: string): string {
  if (!dateString) {
    return "";
  }

  const [year, month, day] = dateString.substring(0, 10).split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate: string = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

export const FAQQuestions = [
  {
    question: "What is the return policy?",
    answer:
      "We offer a 30-day return policy on all of our jewellery. If you're not satisfied with your purchase, you can return it for a full refund.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "We offer standard shipping within 3-5 business days and express shipping within 1-2 weeks. Shipping times may vary depending on your location.",
  },
  {
    question: "How do I care for my jewellery?",
    answer:
      "To keep your jewellery looking its best, we recommend cleaning it with a soft cloth and mild soap and water. Avoid exposing it to harsh chemicals or excessive wear.",
  },
  {
    question: "Do you offer custom orders?",
    answer:
      "Yes, we offer custom orders for our jewellery. If you have a specific design in mind, please contact us and we'll be happy to work with you to bring your vision to life.",
  },
] as { question: string; answer: string }[];
