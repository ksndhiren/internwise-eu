import LegalLayout from "@/components/internwise/LegalLayout";

const Terms = () => {
  return (
    <LegalLayout
      title="Terms and Conditions"
      intro={[
        "These terms and conditions form the agreement between Internwise and every visitor, candidate, employer or other user of the platform. Internwise.com, Internwise.co.uk, Internwise.eu and related regional brands operate under Kape Strategy Ltd in the United Kingdom.",
        "This page is adapted for the Internwise EU web experience and mirrors the main principles published on Internwise.com. Anyone using the service should review these terms regularly because they may be updated from time to time.",
      ]}
      sections={[
        {
          title: "1. Acceptable use of the service",
          paragraphs: [
            "Users must behave respectfully and use the platform only for genuine internship and early-career recruitment activity. Content and messages must remain lawful, accurate and professional at all times.",
          ],
          bullets: [
            "Do not publish offensive, threatening, abusive, sexually suggestive or dishonest material.",
            "Do not post illegal, defamatory or discriminatory content.",
            "Do not include personal contact details, external application links or other information intended to bypass the platform where this is restricted.",
            "Do not spam other members or send repeated unsolicited outreach.",
          ],
        },
        {
          title: "2. Member and client definitions",
          paragraphs: [
            "Candidates use Internwise to discover jobs and internships. Direct Employers use the service to recruit for their own organisations. Recruitment Agencies or organisations posting on behalf of third parties may be subject to different subscription requirements and commercial rules.",
          ],
        },
        {
          title: "3. Accounts and platform rules",
          bullets: [
            "Each user should maintain only one account unless expressly authorised otherwise.",
            "You are responsible for safeguarding your login credentials.",
            "You must not transfer your account to another person or allow someone else to use it.",
            "You may not resell, lease or commercially exploit the service without written permission.",
            "Internwise may remove remote-only vacancies, duplicate posts or listings refreshed purely to increase visibility.",
          ],
        },
        {
          title: "4. Profiles, messages and uploaded content",
          paragraphs: [
            "Users are responsible for keeping profile information accurate and up to date. By uploading profile text, images or other materials, users grant Internwise permission to display that content across authorised Internwise properties and related marketing placements.",
            "Internwise may moderate messages and profiles to protect the integrity of the platform and may suspend or remove accounts that abuse the service.",
          ],
        },
        {
          title: "5. Intellectual property and service operation",
          bullets: [
            "All platform content, trademarks, software and design remain the property of Internwise, Kape Strategy Ltd or the relevant rights holder.",
            "The service may be interrupted, modified or improved from time to time without prior notice where necessary.",
            "Internwise does not guarantee uninterrupted availability and cannot accept responsibility for losses caused by service outages beyond reasonable control.",
          ],
        },
        {
          title: "6. Liability, termination and governing law",
          paragraphs: [
            "The service is provided without warranties beyond those required by law. Users may terminate their relationship with Internwise by closing their account, and Internwise may suspend or terminate accounts where platform rules are breached.",
            "Any dispute should first be approached in good faith through discussion or mediation. These terms are governed by the laws of England.",
          ],
        },
      ]}
    />
  );
};

export default Terms;
