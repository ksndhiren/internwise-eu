import LegalLayout from "@/components/internwise/LegalLayout";

const Privacy = () => {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro={[
        "Kape Strategy Ltd is committed to protecting the privacy of candidates, employers and visitors using Internwise services. This page reflects the privacy principles published on Internwise.com and explains how information is collected, used and protected within the Internwise ecosystem.",
        "By visiting the website, submitting information or using Internwise services, users acknowledge the practices described in this policy and should review it regularly for future updates.",
      ]}
      sections={[
        {
          title: "1. Information collected",
          paragraphs: [
            "When users create an account, apply for opportunities or build a company profile, Internwise may collect personal or business information such as names, email addresses, organisation details, profile content and other information required to operate the service.",
          ],
        },
        {
          title: "2. Updating and deleting your information",
          bullets: [
            "Users can update core account details such as email, password, location and profile content through their account settings.",
            "Users may request account deletion, which removes profile information from active systems apart from records that must be retained for support, compliance or legitimate business purposes.",
          ],
        },
        {
          title: "3. Passwords, cookies and security",
          bullets: [
            "Users are responsible for protecting their passwords and should change them immediately if access is compromised.",
            "Internwise uses cookies and similar technologies to support login flows, member functionality and a smoother site experience.",
            "Reasonable technical and organisational measures are used to protect data, although no internet service can be guaranteed as completely secure.",
          ],
        },
        {
          title: "4. How information is used",
          bullets: [
            "To operate the platform, process applications and enable employer-candidate communication.",
            "To improve products, analyse website use and refine the service experience.",
            "To provide essential service communications, updates and operational notices.",
            "To enforce platform terms and investigate abuse, fraud or security incidents.",
          ],
        },
        {
          title: "5. Disclosure of information",
          paragraphs: [
            "Candidate profiles may be visible to relevant employers, agencies or other members depending on account settings. Internwise does not sell or rent personal data to third parties and discloses information only where users have consented or where disclosure is required by law.",
          ],
        },
        {
          title: "6. Communications and spam policy",
          paragraphs: [
            "Internwise may send service-related emails and platform updates as part of normal account operation. The platform does not sell or rent user email addresses to third parties, and users must not misuse referral tools or messaging features for spam.",
          ],
        },
      ]}
    />
  );
};

export default Privacy;
