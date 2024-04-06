export default function formDataToDict(
  formData: FormData
): Record<string, any> {
  const dictionary: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    dictionary[key] = value;
  }
  return dictionary;
}
