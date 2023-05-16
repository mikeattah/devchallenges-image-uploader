import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="">
      <Link href="/">
        <a className="" data-active={isActive("/")}>
          Feed
        </a>
      </Link>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className="">
        <Link href="/">
          <a className="" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
      </div>
    );

    right = (
      <div className="">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="">
        <Link href="/api/auth/signin">
          <a data-active={isActive("/signup")}>Log in</a>
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="">
        <Link href="/">
          <a className="" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive("/drafts")}>My drafts</a>
        </Link>
      </div>
    );

    right = (
      <div className="">
        <p className="">
          {session.user?.name} ({session.user?.email})
        </p>
        <Link href="/create">
          <button type="button">
            <a className="">New post</a>
          </button>
        </Link>
        <button type="button" onClick={() => signOut()}>
          <a>Log out</a>
        </button>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title></title>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <meta name="robots" content="noodp,noydir" />
        <meta property="title" content="" />
        <meta property="description" content="" />
        <link href="/images/favicon.ico" rel="icon" />
        {/* Open Graph Protocol tags */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />
      </Head>
      <nav className="">
        {left}
        {right}
      </nav>
    </div>
  );
};

export default Header;
