"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import FooterPreview from "@/components/dynamic/FooterPreview";
import HeaderNavbar from "@/components/static/HeaderNavbar";

type BoardPosition = {
  key: string;
  label: string;
  description: string;
};

type BoardCategory = {
  key: string;
  title: string;
  eyebrow: string;
  positions: BoardPosition[];
};

type BoardMember = {
  _id: string;
  name: string;
  category_key: string;
  position_key: string;
  photo_url: string | null;
  order?: number;
};

type BoardMembersResponse = {
  success: boolean;
  data?: BoardMember[];
};

const BOARD_CATEGORIES: BoardCategory[] = [
  {
    key: "board-of-director",
    title: "Board of Director",
    eyebrow: "Executive Direction",
    positions: [
      {
        key: "director",
        label: "Director",
        description:
          "The Director leads the local chapter, sets the organizational direction, and ensures every board function moves with one shared vision.",
      },
      {
        key: "vice-director-external",
        label: "Vice Director of External",
        description:
          "The Vice Director of External manages relationships with external stakeholders, ALSA networks, alumni, and partner communities.",
      },
      {
        key: "vice-director-internal",
        label: "Vice Director of Internal",
        description:
          "The Vice Director of Internal strengthens internal coordination, member welfare, and the daily rhythm of the organization.",
      },
      {
        key: "vice-director-academic-activities",
        label: "Vice Director of Academic Activities",
        description:
          "The Vice Director of Academic Activities oversees academic initiatives that develop legal skill, English proficiency, and critical discussion.",
      },
      {
        key: "secretary",
        label: "Secretary",
        description:
          "The Secretary manages correspondence, documentation, administration, and institutional records for the local chapter.",
      },
      {
        key: "treasurer",
        label: "Treasurer",
        description:
          "The Treasurer maintains financial planning, reporting, and accountability across the board period.",
      },
    ],
  },
  {
    key: "internal",
    title: "Internal",
    eyebrow: "Member Development",
    positions: [
      {
        key: "head",
        label: "Head",
        description:
          "The Head of Internal coordinates programs that nurture member growth, solidarity, and an active organizational culture.",
      },
      {
        key: "alsa-development",
        label: "ALSA Development",
        description:
          "ALSA Development creates spaces for members to understand ALSA values, organizational identity, and leadership habits.",
      },
      {
        key: "domestic-affair",
        label: "Domestic Affair",
        description:
          "Domestic Affair maintains the chapter atmosphere through member-focused initiatives and internal communication.",
      },
      {
        key: "fun-and-gathering",
        label: "Fun and Gathering",
        description:
          "Fun and Gathering designs warm moments that keep members connected beyond formal work programs.",
      },
    ],
  },
  {
    key: "external",
    title: "External",
    eyebrow: "Partnership & Outreach",
    positions: [
      {
        key: "head",
        label: "Head",
        description:
          "The Head of External aligns outreach, partnership, alumni relations, social programs, and international-facing activity.",
      },
      {
        key: "alsa-visit",
        label: "ALSA Visit",
        description:
          "ALSA Visit builds meaningful exchanges with other chapters, institutions, and communities.",
      },
      {
        key: "alumni-affairs",
        label: "Alumni Affairs",
        description:
          "Alumni Affairs connects the current board and members with the wider ALSA LC Unpad alumni family.",
      },
      {
        key: "foreign-affairs",
        label: "Foreign Affairs",
        description:
          "Foreign Affairs maintains international awareness and cross-chapter communication within the ALSA network.",
      },
      {
        key: "social-activities",
        label: "Social Activities",
        description:
          "Social Activities turns socially responsible values into programs that answer community needs.",
      },
    ],
  },
  {
    key: "academic",
    title: "Academic",
    eyebrow: "Legal Growth",
    positions: [
      {
        key: "head",
        label: "Head",
        description:
          "The Head of Academic coordinates learning-focused programs and keeps legal development central to board activity.",
      },
      {
        key: "law-development",
        label: "Law Development",
        description:
          "Law Development facilitates legal discussions, writing, and activities that sharpen legal analysis.",
      },
      {
        key: "english-development",
        label: "English Development",
        description:
          "English Development supports members in building confidence for international communication and legal English.",
      },
      {
        key: "seminar-and-workshop",
        label: "Seminar and Workshop",
        description:
          "Seminar and Workshop prepares learning forums with speakers, practical topics, and professional insight.",
      },
    ],
  },
  {
    key: "financial",
    title: "Financial",
    eyebrow: "Sustainability",
    positions: [
      {
        key: "head-and-vice-head",
        label: "Head and Vice Head",
        description:
          "The Head and Vice Head of Financial coordinate funding strategy, business initiatives, and financial sustainability.",
      },
      {
        key: "funding",
        label: "Funding",
        description:
          "Funding manages fundraising efforts that support the operational and program needs of the chapter.",
      },
      {
        key: "entrepreneurship",
        label: "Entrepreneurship",
        description:
          "Entrepreneurship develops business-oriented programs and products that strengthen organizational resources.",
      },
    ],
  },
  {
    key: "ict",
    title: "Information, Communication and Technology",
    eyebrow: "Digital Presence",
    positions: [
      {
        key: "head-and-vice-head",
        label: "Head and Vice Head",
        description:
          "The Head and Vice Head of ICT guide digital communication, visual direction, and technology support for the chapter.",
      },
      {
        key: "creative",
        label: "Creative",
        description:
          "Creative shapes visual assets, publication materials, and campaign expression across ALSA LC Unpad platforms.",
      },
      {
        key: "networking-development",
        label: "Networking Development",
        description:
          "Networking Development maintains digital channels, platform consistency, and technology-enabled communication.",
      },
    ],
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map(function (word) {
      return word[0];
    })
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const BOARD_MEMBER_PHOTO_CLASS =
  "origin-bottom translate-y-[1%] scale-[1.15] object-contain object-bottom drop-shadow-[0_18px_24px_rgba(0,0,0,0.28)]";

function BoardMemberPortrait({ member }: { member: BoardMember }) {
  return (
    <div className="relative mx-auto aspect-3/4 w-[min(64vw,260px)] overflow-visible">
      <div className="absolute bottom-0 left-0 aspect-square w-full rounded-full bg-(--feeds-color-gold)" />

      {member.photo_url ? (
        <>
          <div
            className="absolute inset-0 z-20 overflow-visible"
            style={{ clipPath: "inset(0 0 calc(100% - 2px) 0)" }}
          >
            <Image
              src={member.photo_url}
              alt={member.name}
              fill
              sizes="420px"
              className={BOARD_MEMBER_PHOTO_CLASS}
            />
          </div>

          <div className="absolute bottom-0 left-0 z-10 h-full w-full overflow-hidden rounded-b-full">
            <div className="absolute bottom-0 left-0 h-[266.6667%] w-full">
              <Image
                src={member.photo_url}
                alt=""
                aria-hidden="true"
                fill
                sizes="420px"
                className={BOARD_MEMBER_PHOTO_CLASS}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="absolute bottom-0 left-1/2 z-10 flex aspect-square w-full -translate-x-1/2 items-center justify-center rounded-full text-[3rem] font-extrabold text-(--primary-color)">
          {getInitials(member.name)}
        </div>
      )}
    </div>
  );
}

export default function BoardPage() {
  const [activeCategoryKey, setActiveCategoryKey] = useState(
    BOARD_CATEGORIES[0].key,
  );
  const [activePositionKey, setActivePositionKey] = useState(
    BOARD_CATEGORIES[0].positions[0].key,
  );
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);

  const activeCategory =
    BOARD_CATEGORIES.find(function (category) {
      return category.key === activeCategoryKey;
    }) ?? BOARD_CATEGORIES[0];

  const activePosition =
    activeCategory.positions.find(function (position) {
      return position.key === activePositionKey;
    }) ?? activeCategory.positions[0];

  const activeMembers = useMemo(
    function () {
      return members.filter(function (member) {
        return (
          member.category_key === activeCategory.key &&
          member.position_key === activePosition.key
        );
      });
    },
    [activeCategory.key, activePosition.key, members],
  );

  useEffect(function () {
    let isMounted = true;

    async function loadBoardMembers() {
      try {
        const response = await fetch("/api/board-members", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) return;

        const payload = (await response.json()) as BoardMembersResponse;

        if (isMounted && payload.success && payload.data) {
          setMembers(payload.data);
        }
      } catch {
        // Keep the board usable with empty CMS data.
      }
    }

    loadBoardMembers();

    return function () {
      isMounted = false;
    };
  }, []);

  function handleCategoryChange(category: BoardCategory) {
    setActiveCategoryKey(category.key);
    setActivePositionKey(category.positions[0].key);
  }

  return (
    <div>
      <HeaderNavbar />
      <main className="relative min-h-screen overflow-hidden bg-(--bg-color-primary) pt-[clamp(92px,10vw,140px)]">
        <div className="pointer-events-none absolute -right-40 top-55 h-90 w-90 rounded-full border border-[rgba(209,154,4,0.32)]" />
        <div className="pointer-events-none absolute -left-35 bottom-45 h-70 w-70 rounded-full border border-[rgba(240,240,234,0.14)]" />

        <section className="relative z-1 px-[clamp(20px,5vw,72px)] pb-[clamp(72px,9vw,128px)]">
          <div className="mx-auto flex w-full max-w-305 flex-col gap-[clamp(30px,5vw,58px)]">
            <div className="max-w-180">
              <p className="text-[clamp(0.72rem,1vw,0.9rem)] font-bold uppercase tracking-[0.18em] text-(--feeds-color-gold)">
                ALSA LC Unpad
              </p>
              <h1 className="mt-3 text-[clamp(2.4rem,5.4vw,5rem)] font-extrabold uppercase leading-none text-(--secondary-color)">
                Local Board
              </h1>
              <p className="mt-4 max-w-150 text-[clamp(0.92rem,1.25vw,1.08rem)] font-semibold leading-relaxed text-[rgba(240,240,234,0.82)]">
                Meet the people behind each directorate, division, and program
                focus of ALSA Local Chapter Universitas Padjadjaran.
              </p>
            </div>

            <div className="grid gap-[clamp(28px,4vw,52px)] lg:grid-cols-[minmax(220px,280px)_1fr]">
              <aside className="lg:border-r lg:border-[rgba(209,154,4,0.65)] lg:pr-[clamp(22px,3vw,36px)]">
                <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                  {BOARD_CATEGORIES.map(function (category) {
                    const isActive = category.key === activeCategory.key;

                    return (
                      <button
                        key={category.key}
                        type="button"
                        aria-pressed={isActive}
                        onClick={function () {
                          handleCategoryChange(category);
                        }}
                        className={[
                          "min-w-55 rounded-lg border px-4 py-3 text-left transition duration-300 lg:min-w-0",
                          isActive
                            ? "border-(--feeds-color-gold) bg-[rgba(209,154,4,0.14)]"
                            : "border-[rgba(240,240,234,0.16)] bg-[rgba(240,240,234,0.04)] hover:border-[rgba(209,154,4,0.55)]",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "block text-[0.72rem] font-bold uppercase tracking-[0.16em]",
                            isActive
                              ? "text-(--feeds-color-gold)"
                              : "text-[rgba(240,240,234,0.52)]",
                          ].join(" ")}
                        >
                          {category.eyebrow}
                        </span>
                        <span className="mt-1 block text-[clamp(0.95rem,1.4vw,1.12rem)] font-bold leading-tight text-(--secondary-color)">
                          {category.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              <section className="min-w-0">
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-[clamp(0.72rem,1vw,0.86rem)] font-bold uppercase tracking-[0.18em] text-(--feeds-color-gold)">
                      {activeCategory.eyebrow}
                    </p>
                    <h2 className="mt-2 max-w-220 text-[clamp(1.75rem,3.4vw,3.4rem)] font-extrabold leading-[1.08] text-(--secondary-color)">
                      {activeCategory.title}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {activeCategory.positions.map(function (position) {
                      const isActive = position.key === activePosition.key;

                      return (
                        <button
                          key={position.key}
                          type="button"
                          aria-pressed={isActive}
                          onClick={function () {
                            setActivePositionKey(position.key);
                          }}
                          className={[
                            "max-w-full rounded-lg border px-4 py-2.5 text-sm font-bold leading-tight whitespace-normal transition duration-300 md:text-[0.95rem]",
                            isActive
                              ? "border-(--feeds-color-gold) bg-(--feeds-color-gold) text-(--primary-color)"
                              : "border-[rgba(209,154,4,0.72)] bg-transparent text-(--secondary-color) hover:bg-[rgba(209,154,4,0.12)]",
                          ].join(" ")}
                        >
                          {position.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid items-end gap-[clamp(30px,4vw,54px)]">
                  {activeMembers.length > 0 ? (
                    <div className="flex flex-wrap items-end justify-center gap-x-[clamp(46px,8vw,116px)] gap-y-[clamp(34px,5vw,64px)]">
                      {activeMembers.map(function (member) {
                        const shouldDim =
                          hoveredMemberId !== null &&
                          hoveredMemberId !== member._id;

                        return (
                          <article
                            key={member._id}
                            tabIndex={0}
                            onMouseEnter={function () {
                              setHoveredMemberId(member._id);
                            }}
                            onMouseLeave={function () {
                              setHoveredMemberId(null);
                            }}
                            onFocus={function () {
                              setHoveredMemberId(member._id);
                            }}
                            onBlur={function () {
                              setHoveredMemberId(null);
                            }}
                            className={[
                              "group w-[min(76vw,300px)] text-center transition duration-500 ease-out",
                              shouldDim
                                ? "scale-95 opacity-35 grayscale"
                                : "scale-100 opacity-100 hover:scale-110 focus:scale-110",
                            ].join(" ")}
                          >
                            <BoardMemberPortrait member={member} />
                            <h3 className="mt-3 text-[clamp(1.12rem,1.8vw,1.45rem)] font-extrabold leading-tight text-(--secondary-color)">
                              {member.name}
                            </h3>
                            <p className="mt-2 text-sm font-semibold text-[rgba(240,240,234,0.72)]">
                              {activePosition.label}
                            </p>
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mx-auto mt-12 flex min-h-80 w-full max-w-155 flex-col items-center justify-center rounded-lg border border-dashed border-[rgba(240,240,234,0.24)] bg-[rgba(240,240,234,0.05)] px-6 text-center">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-(--feeds-color-gold) text-3xl font-extrabold text-(--primary-color)">
                        {activePosition.label
                          .split(" ")
                          .map(function (word) {
                            return word[0];
                          })
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <h3 className="mt-6 text-[clamp(1.25rem,2vw,1.7rem)] font-extrabold text-(--secondary-color)">
                        {activePosition.label}
                      </h3>
                      <p className="mt-3 max-w-100 text-sm font-semibold leading-relaxed text-[rgba(240,240,234,0.68)]">
                        Member name and photo will appear here after the current
                        board data is published in the CMS.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-[clamp(30px,4vw,52px)] border-l-3 border-(--feeds-color-gold) pl-5 md:pl-7">
                  <h3 className="text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold text-(--secondary-color)">
                    {activePosition.label}
                  </h3>
                  <p className="mt-3 max-w-230 text-[clamp(0.98rem,1.45vw,1.2rem)] font-semibold leading-relaxed text-[rgba(240,240,234,0.82)]">
                    {activePosition.description}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <FooterPreview />
    </div>
  );
}
