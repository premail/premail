# Premail Security Policy

<!-- This document gets mirrored from the Premail documentation site repo to the
     main Premail repo automatically. It should only be edited in the site repo:
     https://github.com/premail/website
     and all links need to be absolute and not relative. -->

**Premail is provided "as is" without any warranty. Use at your own risk.**

## On vulnerabilities and so-called vulnerabilities

tl;dr: Premail is designed to run on _your_ machine, with _your_ code. If you
are reporting a security vulnerability because of an npm warning, GitHub
Dependabot warning, Snyk alert, or CVE, please make sure it's truly a
vulnerability in this context.

---

In 2021, Dan Abramov wrote
["npm audit: Broken by Design"](https://overreacted.io/npm-audit-broken-by-design/)
explaining why many "vulnerabilities" reported in `npm audit` (which runs
anytime you use `npm install` as well, and which GitHub's Dependabot also uses)
are not really vulnerabilities. Like his example of
[create-react-app](https://www.npmjs.com/package/create-react-app), Premail is
designed to run on your machine, with your code (MJML, YAML and Sass).

Many vulnerabilities, especially DDoS attacks, assume as the vector of attack
being able to pass malformed or voluminous code to the program. But if an
attacker has _access to your machine_ such that they can pass things to a
running program, they can do a lot more than overflow buffers!

That you can write code that will break a program isn't really a vulnerability.
That doesn't mean we can't improve the handling of bad code better -- if you
experience Premail crashing without (helpful) error messages, you can certainly
file that as a bug or feature request. But it's not a _security risk_.

Many folks have connected this broken reporting system to the nature of CVEs
themselves;
[SQLite has an excellent write-up](https://www.sqlite.org/cves.html).

npm does have a couple of different proposals for addressing this in the works,
and I hope they land on something soon.

---

In the meantime, if you are thinking of filing an issue about a security warning
you see in your console or in your GitHub repo about a "vulnerability" in one of
Premail's dependencies, please first consider if it is in fact an actual
vulnerability. Issues that are filed that report these non-vulnerabilities will
be closed with a pointer to
[this issue](https://github.com/premail/premail/issues/70).

Thanks for helping us make Premail great!

## Reporting security issues

If there are any vulnerabilities in **Premail** or the custom MJML components
that are a part of it, **MJML Bullet List** and **MJML Signoff**, please do
report them!

1. Reach out to us [on Twitter](https://twitter.com/premaildev) (we'll follow
   you back so you can send a DM) or by emailing **security@premail.dev**.
   Please don't open an issue for a security vulnerability.

2. Describe the security issue.

- If you have a fix, that is most welcome -- please attach or summarize it in
  your message!

3. We will evaluate the vulnerability and, if necessary, release a fix or
   mitigating steps to address it. We will contact you to let you know the
   outcome, and will credit you in the report.

- Please **do not disclose the vulnerability publicly** until a fix is released!

4. Once we have either a) published a fix, or b) declined to address the
   vulnerability for whatever reason, you are free to publicly disclose it.
