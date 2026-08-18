export const metadata = {
  title: "Privacy Policy | Mediterranean Table",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-brand-ink">Privacy Policy</h1>
      <p className="mt-2 text-sm text-brand-ink/50">Last updated: 18 August 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-brand-ink/80">
        <section>
          <h2 className="font-display mb-2 text-lg font-semibold text-brand-ink">
            1. Introduction
          </h2>
          <p>
            Mediterranean Table (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a recipe and
            weekly meal-planning site powered by Bodrum Foods. This policy explains what
            information the site handles when you use it, and how it is used. This is a standard
            policy that we will review and refine in more detail over time.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-2 text-lg font-semibold text-brand-ink">
            2. Information we collect
          </h2>
          <p>
            Mediterranean Table does not require an account and does not ask you to submit
            personal information to browse recipes, build a weekly plan, or generate a shopping
            list.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <span className="font-medium text-brand-ink">Weekly meal plan data.</span> The
              recipes you add to your weekly plan and shopping list are stored only in your own
              browser&apos;s local storage. This information is never transmitted to or stored on
              our servers.
            </li>
            <li>
              <span className="font-medium text-brand-ink">Technical/usage data.</span> Our hosting
              provider may automatically log standard technical information (such as IP address,
              browser type, and pages visited) for security and performance purposes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display mb-2 text-lg font-semibold text-brand-ink">
            3. Cookies and local storage
          </h2>
          <p>
            We use your browser&apos;s local storage to remember your weekly meal plan between
            visits. We do not currently use tracking or advertising cookies. You can clear this
            data at any time from your browser settings, or by using the &quot;Clear Plan&quot;
            option on the Weekly Planner page.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-2 text-lg font-semibold text-brand-ink">
            4. Ordering ingredients from bodrumfoods.co.uk
          </h2>
          <p>
            When you choose to add ingredients to your cart, you are taken to{" "}
            <a
              href="https://bodrumfoods.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-ink underline hover:text-brand-red"
            >
              bodrumfoods.co.uk
            </a>
            , an independent online store. Any personal or payment information you provide there —
            for account creation, checkout, or delivery — is collected and processed by
            bodrumfoods.co.uk under its own privacy policy, not this one.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-2 text-lg font-semibold text-brand-ink">
            5. How we use information
          </h2>
          <p>
            Any technical data described above is used solely to operate, secure, and improve the
            site. We do not sell or share personal data with third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-2 text-lg font-semibold text-brand-ink">
            6. Your rights
          </h2>
          <p>
            Since your weekly plan data is stored only on your own device, you are always in
            control of it — you can delete it at any time by clearing your browser&apos;s local
            storage or using &quot;Clear Plan&quot;. If you have questions about data handled by
            bodrumfoods.co.uk, please refer to their privacy policy or contact them directly. UK
            residents have rights under UK GDPR, including the right to access, correct, or delete
            personal data held about them.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-2 text-lg font-semibold text-brand-ink">
            7. Children&apos;s privacy
          </h2>
          <p>
            This site is not directed at children, and we do not knowingly collect personal
            information from children.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-2 text-lg font-semibold text-brand-ink">
            8. Changes to this policy
          </h2>
          <p>
            We may update this policy from time to time. The &quot;Last updated&quot; date at the
            top of this page reflects the most recent changes.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-2 text-lg font-semibold text-brand-ink">
            9. Contact us
          </h2>
          <p>
            If you have questions about this policy, please contact Bodrum Foods via{" "}
            <a
              href="https://bodrumfoods.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-ink underline hover:text-brand-red"
            >
              bodrumfoods.co.uk
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
