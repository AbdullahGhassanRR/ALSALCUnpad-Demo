"use client";

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import HeaderNavbar from '@/components/static/HeaderNavbar';
import lampImage from '@/asset/LAMP.png';
import asvpImage from '@/asset/ASVP.png';
import aecImage from '@/asset/alsa-english-challenge.png';

type EventPreviewResponse = {
	success: boolean;
	data?: EventPreviewItem[];
};

type EventPreviewItem = {
	_id: string;
	event_title: string;
	event_description: string;
	event_image_url: string | null;
};

type EventCard = {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	category: EventCategory;
};

type EventCategory = 'Mentoring' | 'Community' | 'Competition' | 'General';

type EventFilter = EventCategory | 'All';

const FALLBACK_EVENTS: EventCard[] = [
	{
		id: 'fallback-lamp',
		title: 'Law Alumni Mentoring Programme',
		description:
			'Designed around the concept of guidance and mentorship, involving alumni who are currently working as legal professionals in various fields of law as mentors for student participants.',
		imageUrl: lampImage.src,
		category: 'Mentoring',
	},
	{
		id: 'fallback-asvp',
		title: 'ALSA Social Village Project',
		description:
			'Designed as a community service initiative carried out in rural areas. The program aims to contribute directly to village communities by implementing activities based on the four core pillars.',
		imageUrl: asvpImage.src,
		category: 'Community',
	},
	{
		id: 'fallback-aec',
		title: 'ALSA English Challenge',
		description:
			'A national annual English competition under the English Development Subdivision of the Academic Activities Division of ALSA LC Unpad that strives to create opportunities to train and sharpen the English skills of students across Indonesia.',
		imageUrl: aecImage.src,
		category: 'Competition',
	},
];

function inferEventCategory(title: string, description: string): EventCategory {
	const haystack = `${title} ${description}`.toLowerCase();

	if (/mentor|mentoring|alumni/.test(haystack)) {
		return 'Mentoring';
	}

	if (/village|community|social|service/.test(haystack)) {
		return 'Community';
	}

	if (/challenge|competition|contest|tournament/.test(haystack)) {
		return 'Competition';
	}

	return 'General';
}

const PAGE_CLASSES =
	'min-h-[100vh] bg-[var(--secondary-color)] pb-[clamp(48px,8vw,88px)]';

const CONTENT_CLASSES =
	'w-[min(92%,1200px)] mx-auto pt-[clamp(110px,14vw,160px)]';

const TITLE_CLASSES =
	'text-[var(--primary-color)] text-center font-bold leading-[1.05] text-[clamp(2rem,8vw,7rem)]';

const SUBTITLE_CLASSES =
	'text-[var(--primary-color)] text-center mt-[clamp(6px,1vw,12px)] text-[clamp(0.9rem,1.5vw,1.15rem)]';

const GRID_CLASSES =
	'mt-[clamp(26px,4vw,52px)] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(14px,2vw,24px)]';

const CARD_BUTTON_CLASSES =
	'group w-full h-full bg-white border-[4px] border-[var(--primary-color)] rounded-[20px] overflow-hidden text-left ' +
	'transition-transform duration-300 hover:-translate-y-[6px] focus-visible:outline-none ' +
	'focus-visible:ring-4 focus-visible:ring-[rgba(116,1,7,0.3)] cursor-pointer';

const CARD_IMAGE_WRAP_CLASSES =
	'relative w-full h-[clamp(160px,24vw,230px)] overflow-hidden';

const CARD_TITLE_CLASSES =
	'text-[var(--primary-color)] font-bold text-[clamp(1.05rem,1.7vw,1.45rem)] leading-tight';

const CARD_DESC_CLASSES =
	'mt-[8px] text-[var(--primary-color)] text-[clamp(0.85rem,1.15vw,1rem)] leading-relaxed';

const MODAL_OVERLAY_CLASSES =
	'fixed inset-0 z-40 bg-[rgba(0,0,0,0.45)] backdrop-blur-[1px] flex items-center justify-center px-[14px]';

const MODAL_SHEET_CLASSES =
	'w-[min(94%,960px)] max-h-[86vh] overflow-hidden rounded-[20px] border-[4px] border-[var(--primary-color)] bg-[var(--secondary-color)] shadow-[0_22px_70px_rgba(0,0,0,0.28)]';

const MODAL_BODY_CLASSES =
	'overflow-y-auto max-h-[calc(86vh-72px)] p-[clamp(14px,2vw,24px)] grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-[clamp(14px,2vw,24px)]';

export default function EventsPage() {
	const [events, setEvents] = useState<EventCard[]>(FALLBACK_EVENTS);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
	const [searchKeyword, setSearchKeyword] = useState('');
	const [activeFilter, setActiveFilter] = useState<EventFilter>('All');

	useEffect(function () {
		let isMounted = true;

		async function loadEvents() {
			try {
				const response = await fetch('/api/event-preview', {
					method: 'GET',
					cache: 'no-store',
				});

				if (!response.ok) {
					return;
				}

				const payload = (await response.json()) as EventPreviewResponse;

				if (!payload.success || !payload.data || payload.data.length === 0) {
					return;
				}

				const mappedEvents = payload.data
					.filter(function (item) {
						return Boolean(item.event_image_url && item.event_title && item.event_description);
					})
					.map(function (item) {
						return {
							id: item._id,
							title: item.event_title,
							description: item.event_description,
							imageUrl: item.event_image_url as string,
							category: inferEventCategory(item.event_title, item.event_description),
						};
					});

				if (isMounted && mappedEvents.length > 0) {
					setEvents(mappedEvents);
				}
			} catch {
				// Fallback events remain visible if API fetch fails.
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		}

		loadEvents();

		return function () {
			isMounted = false;
		};
	}, []);

	useEffect(
		function () {
			if (!selectedEventId) {
				return;
			}

			function handleEscape(event: KeyboardEvent) {
				if (event.key === 'Escape') {
					setSelectedEventId(null);
				}
			}

			window.addEventListener('keydown', handleEscape);

			return function () {
				window.removeEventListener('keydown', handleEscape);
			};
		},
		[selectedEventId],
	);

	const selectedEvent = useMemo(function () {
		if (!selectedEventId) {
			return null;
		}

		return events.find(function (eventItem) {
			return eventItem.id === selectedEventId;
		}) ?? null;
	}, [events, selectedEventId]);

	const filterOptions = useMemo(function () {
		const uniqueCategories = new Set<EventCategory>();

		events.forEach(function (eventItem) {
			uniqueCategories.add(eventItem.category);
		});

		return ['All', ...Array.from(uniqueCategories)] as EventFilter[];
	}, [events]);

	const filteredEvents = useMemo(function () {
		const normalizedKeyword = searchKeyword.trim().toLowerCase();

		return events.filter(function (eventItem) {
			const passesFilter = activeFilter === 'All' || eventItem.category === activeFilter;

			if (!passesFilter) {
				return false;
			}

			if (!normalizedKeyword) {
				return true;
			}

			const haystack = `${eventItem.title} ${eventItem.description} ${eventItem.category}`.toLowerCase();
			return haystack.includes(normalizedKeyword);
		});
	}, [activeFilter, events, searchKeyword]);

	return (
		<>

			<main className={PAGE_CLASSES}>
				<section className={CONTENT_CLASSES}>
					<h1 className={TITLE_CLASSES}>Our Events</h1>
					<p className={SUBTITLE_CLASSES}>
						Click any event card to read its full details.
					</p>

					<div className="mt-[clamp(16px,2.4vw,30px)] flex flex-col gap-3.5 md:gap-4 animate-[fade-in_500ms]">
						<label htmlFor="events-search" className="sr-only">
							Search events
						</label>
						<input
							id="events-search"
							type="text"
							value={searchKeyword}
							onChange={function (event) {
								setSearchKeyword(event.target.value);
							}}
							placeholder="Search by title or description"
							className="w-full rounded-[14px] border-[3px] border-(--primary-color) bg-white px-[clamp(12px,1.6vw,16px)] py-[clamp(10px,1.4vw,12px)] text-(--primary-color) placeholder:text-[rgba(116,1,7,0.62)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(116,1,7,0.22)]"
						/>

						<div className="flex flex-wrap gap-2">
							{filterOptions.map(function (filterOption) {
								const isActive = filterOption === activeFilter;

								return (
									<button
										key={filterOption}
										type="button"
										onClick={function () {
											setActiveFilter(filterOption);
										}}
										className={`px-3 py-2 rounded-xl border-2 text-sm font-semibold transition-all duration-300 ${
											isActive
												? 'border-(--primary-color) bg-(--primary-color) text-(--secondary-color)'
												: 'border-(--primary-color) bg-white text-(--primary-color) hover:bg-[rgba(116,1,7,0.08)]'
										}`}
										aria-pressed={isActive}
									>
										{filterOption}
									</button>
								);
							})}
						</div>
					</div>

					<div key={`${activeFilter}-${searchKeyword.trim().toLowerCase()}`} className={GRID_CLASSES}>
						{filteredEvents.map(function (eventItem, index) {
							return (
								<button
									key={eventItem.id}
									type="button"
									className={`${CARD_BUTTON_CLASSES} animate-[fade-in_420ms_ease-out_forwards] opacity-0`}
									style={{animationDelay: `${index * 70}ms`}}
									onClick={function () {
										setSelectedEventId(eventItem.id);
									}}
									aria-label={`Open details for ${eventItem.title}`}
								>
									<div className={CARD_IMAGE_WRAP_CLASSES}>
										<Image
											src={eventItem.imageUrl}
											alt={eventItem.title}
											fill
											sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
											className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
										/>
									</div>

									<div className="p-[clamp(14px,2vw,20px)]">
										<p className="text-(--primary-color) text-xs font-semibold tracking-[0.3px] uppercase">
											{eventItem.category}
										</p>
										<h2 className={CARD_TITLE_CLASSES}>{eventItem.title}</h2>
										<p className={CARD_DESC_CLASSES}>
											{eventItem.description.length > 140
												? `${eventItem.description.slice(0, 140)}...`
												: eventItem.description}
										</p>
									</div>
								</button>
							);
						})}
					</div>

					{!isLoading && filteredEvents.length === 0 && (
						<p className="mt-5 text-center text-(--primary-color) font-medium animate-[fade-in_300ms]">
							No event matches your search/filter.
						</p>
					)}

					{isLoading && (
						<p className="mt-4.5 text-center text-(--primary-color) text-sm">
							Loading events...
						</p>
					)}
				</section>
			</main>

			{selectedEvent && (
				<div
					className={`${MODAL_OVERLAY_CLASSES} animate-[fade-in_180ms]`}
					role="presentation"
					onClick={function () {
						setSelectedEventId(null);
					}}
				>
					<div
						className={`${MODAL_SHEET_CLASSES} animate-[fade-in_180ms_ease-out,entry-blurp-square_240ms_ease-out]`}
						role="dialog"
						aria-modal="true"
						aria-labelledby="event-modal-title"
						onClick={function (event) {
							event.stopPropagation();
						}}
					>
						<div className="h-18 px-[clamp(14px,2vw,24px)] border-b border-[rgba(116,1,7,0.2)] flex items-center justify-between">
							<h2
								id="event-modal-title"
								className="text-(--primary-color) font-bold text-[clamp(1.05rem,2vw,1.6rem)]"
							>
								{selectedEvent.title}
							</h2>
							<button
								type="button"
								onClick={function () {
									setSelectedEventId(null);
								}}
								className="h-10 w-10 rounded-[10px] border border-(--primary-color) text-(--primary-color) font-bold hover:bg-(--primary-color) hover:text-(--secondary-color) transition-colors duration-200"
								aria-label="Close event details"
							>
								X
							</button>
						</div>

						<div className={MODAL_BODY_CLASSES}>
							<div className="relative h-[clamp(220px,36vw,460px)] w-full rounded-[14px] overflow-hidden border-[3px] border-(--primary-color)">
								<Image
									src={selectedEvent.imageUrl}
									alt={selectedEvent.title}
									fill
									sizes="(max-width: 768px) 100vw, 50vw"
									className="object-cover"
								/>
							</div>

							<div className="text-(--primary-color) text-[clamp(0.92rem,1.2vw,1.04rem)] leading-relaxed whitespace-pre-line">
								{selectedEvent.description}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
