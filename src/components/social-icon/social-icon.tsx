import Clipboard from "@/components/clipboard/clipboard";

import socialsData from "@/data/socials.json";

export default function SocialIcon({
  social,
}: {
  social: (typeof socialsData)[number];
}) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={social.logo}
      alt={social.name}
      title={`${social.name}: ${social.prefix || ""}${social.account}`}
    />
  );

  return (
    <li>
      {social.link !== undefined ? (
        <a href={social.link} target="_blank" rel="nofollow external">
          {img}
        </a>
      ) : (
        <Clipboard
          text={social.account}
          message={`My ${social.name} account is:\n${social.prefix || ""}${
            social.account
          }\n\nIt has been copied to your clipboard.`}
        >
          {img}
        </Clipboard>
      )}
    </li>
  );
}
