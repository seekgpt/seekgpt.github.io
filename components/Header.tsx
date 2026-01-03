"use client";
import * as React from "react";
import {
	AccessibleIcon,
	Flex,
	IconButton,
	Link,
	Theme,
	Tooltip,
} from "@radix-ui/themes";
import styles from "./Header.module.css";
import { BoxLink } from "./BoxLink";
import { ThemeToggle } from "./ThemeToggle";
import { GitHubLogoIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMobileMenuContext } from "./MobileMenu";
import { classNames } from "@utils/classNames";
import { RadixLogo, RadixLogoIcon } from "./RadixLogo";
import { RemoveScroll } from "react-remove-scroll";

export interface HeaderProps {
	children?: React.ReactNode;
	gitHubLink?: string;
	ghost?: boolean;
}

type ScrollState = "at-top" | "scrolling-up" | "scrolling-down";

export const Header = ({ children, gitHubLink, ghost }: HeaderProps) => {
	const mobileMenu = useMobileMenuContext();
	const router = useRouter();

	const [scrollState, setScrollState] = React.useState<ScrollState>("at-top");

	React.useEffect(() => {
		let previousScrollY = window.scrollY;

		const handleScroll = () => {
			const direction =
				previousScrollY < window.scrollY ? "scrolling-down" : "scrolling-up";
			const state = window.scrollY < 30 ? "at-top" : direction;
			previousScrollY = window.scrollY;
			setScrollState(state);
		};

		if (ghost) {
			addEventListener("scroll", handleScroll, { passive: true });
		} else {
			removeEventListener("scroll", handleScroll);
		}

		handleScroll();
		return () => removeEventListener("scroll", handleScroll);
	}, [ghost]);

	return (
		<Theme asChild className="radix-themes-custom-fonts">
			<div
				data-scroll-state={scrollState}
				data-mobile-menu-open={mobileMenu.open}
				className={classNames(styles.HeaderRoot, ghost ? styles.ghost : "")}
			>
				<div className={styles.HeaderInner}>
					{/* Components that hide the scrollbar (like Dialog) add padding to
					account for the scrollbar gap to avoid layout jank. This does not
					work for position: fixed elements. Since we use react-remove-scroll
					under the hood for those primitives, we can add this helper class
					provided by that lib to deal with that for the Header.
					https://github.com/radix-ui/website/issues/64
					https://github.com/theKashey/react-remove-scroll#positionfixed-elements */}
					<div
						className={RemoveScroll.classNames.fullWidth}
						style={{
							position: "absolute",
							height: "inherit",
							top: 0,
							left: 0,
							right: 0,
						}}
					>
						<Flex
							display={{ sm: "none" }}
							align="center"
							position="absolute"
							top="0"
							bottom="0"
							left="0"
							pl="4"
						>
							{mobileMenu.open ? (
								<NextLink href="/" passHref legacyBehavior>
									<BoxLink>
										<AccessibleIcon label="Radix Homepage">
											<RadixLogoIcon />
										</AccessibleIcon>
									</BoxLink>
								</NextLink>
							) : (
								<RadixByWorkOSLogoLink />
							)}
						</Flex>

						<Flex
							display={{ initial: "none", sm: "flex" }}
							align="center"
							position="absolute"
							top="0"
							bottom="0"
							left="0"
							pl="4"
						>
							<RadixByWorkOSLogoLink />
						</Flex>

						<div className={styles.HeaderProductLinksContainer}>
							<HeaderProductLink
								href="/research/docs/overview/getting-started"
								active={
									router.pathname.startsWith("/research") 
								}
							>
								Research 
							</HeaderProductLink>
							<HeaderProductLink
								href="/products"
								active={router.pathname.startsWith("/products")}
							>
								Products
							</HeaderProductLink>
							<HeaderProductLink
								href="/developer"
								active={router.pathname === "/developer" ||
									router.pathname.startsWith("/developer/docs") }
							>
								Developers
							</HeaderProductLink>
							<HeaderProductLink
								href="/company"
								active={router.pathname.startsWith("/company")}
							>
								Company
							</HeaderProductLink>
						</div>

						<Flex
							display={{ initial: "none", md: "flex" }}
							align="center"
							gap="5"
							position="absolute"
							top="0"
							bottom="0"
							right="0"
							pr="4"
						>
							{children}

							<Link
								size="2"
								color="gray"
								href="/blog"
								highContrast={router.pathname.includes("/blog")}
							>
								Blog
							</Link>

							{gitHubLink && (
								<Tooltip
									className="radix-themes-custom-fonts"
									content="View GitHub"
								>
									<IconButton asChild size="3" variant="ghost" color="gray">
										<a
											href={gitHubLink}
											target="_blank"
											aria-label="View GitHub"
										>
											<GitHubLogoIcon width="16" height="16" />
										</a>
									</IconButton>
								</Tooltip>
							)}

							<ThemeToggle />
						</Flex>

						<Flex
							display={{ md: "none" }}
							align="center"
							gap="4"
							position="absolute"
							top="0"
							bottom="0"
							right="0"
							pr="4"
						>
							<div className={styles.HeaderThemeToggleContainer}>
								<ThemeToggle />
							</div>

							<Tooltip
								className="radix-themes-custom-fonts"
								content="Navigation"
							>
								<IconButton
									size="3"
									variant="ghost"
									color="gray"
									data-state={mobileMenu.open ? "open" : "closed"}
									onClick={() => mobileMenu.setOpen((open) => !open)}
									className={styles.MobileMenuButton}
								>
									<HamburgerMenuIcon width="16" height="16" />
								</IconButton>
							</Tooltip>
						</Flex>
					</div>
				</div>
			</div>
		</Theme>
	);
};

const HeaderProductLink = ({
	active,
	children,
	href = "",
	...props
}: React.ComponentPropsWithoutRef<"a"> & { active?: boolean }) => (
	<NextLink href={href} passHref legacyBehavior>
		<a
			data-state={active ? "active" : "inactive"}
			className={styles.HeaderProductLink}
			{...props}
		>
			<span className={styles.HeaderProductLinkInner}>{children}</span>
			<span className={styles.HeaderProductLinkInnerHidden}>{children}</span>
		</a>
	</NextLink>
);

const RadixByWorkOSLogoLink = () => (
	<Flex align="center" gap="3">
		<NextLink href="/" passHref legacyBehavior>
			<BoxLink>
				<AccessibleIcon label="Narzary Homepage">
					<RadixLogo />
				</AccessibleIcon>
			</BoxLink>
		</NextLink>

		<div
			style={{
				background: "currentcolor",
				opacity: 0.15,
				width: 1,
				height: 24,
			}}
		/>

		<BoxLink href="https://www.narzary.com" target="_blank">
			<AccessibleIcon label="Made by NarzaryAI">
				<svg width="100" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clipPath="url(#clip0_5_2)">
					<path d="M0.552536 11C0.552536 11.4821 0.700748 11.9644 0.988577 12.3796L6.2039 20.0879C6.73874 20.8744 7.55175 21.5179 8.56238 21.8056C9.49127 22.0768 10.5017 22.0639 11.4206 21.769C12.3395 21.4742 13.1098 20.9158 13.5994 20.1896L14.8581 18.3279L9.89091 11L15.1352 3.24041L16.3951 1.37959C16.7653 0.834441 17.2689 0.36388 17.8718 0H9.78244C8.36475 0 7.05557 0.6435 6.35211 1.69216L0.988577 9.62134C0.701997 10.0396 0.551465 10.5155 0.552536 11ZM30.2936 11C30.2936 10.5178 30.1454 10.0347 29.8575 9.62041L24.5734 1.81041C24.0806 1.08695 23.31 0.530974 22.3922 0.236502C21.4744 -0.05797 20.4656 -0.0728672 19.5365 0.19433C18.5269 0.482163 17.7128 1.12475 17.178 1.91216L15.988 3.663L20.9552 11L15.7109 18.7586L14.4512 20.6204C14.0752 21.1704 13.5693 21.6361 12.9744 22H21.0636C22.4813 22 23.7905 21.3565 24.494 20.3079L29.8575 12.3786C30.1454 11.9644 30.2936 11.4821 30.2936 11Z" fill="black"/>
					<path d="M40.0435 6.00916V0.269149H41.2509L43.4037 4.84763H43.4785L45.6312 0.269149H46.8386V6.00916H45.8839V1.79664H45.8137L43.8295 6.00916H43.0526L41.0731 1.79664H40.9982V6.00916H40.0435ZM49.8102 6.08076C48.8415 6.08076 48.1255 5.57955 48.1255 4.79592V4.78796C48.1255 4.01626 48.8088 3.56677 50.0208 3.50312L51.3967 3.4355V3.05363C51.3967 2.58027 51.0458 2.31773 50.3578 2.31773C49.7962 2.31773 49.4265 2.49276 49.3048 2.79905L49.3001 2.81496H48.3221L48.3267 2.78711C48.4485 2.07906 49.2487 1.6057 50.4046 1.6057C51.6821 1.6057 52.4028 2.14668 52.4028 3.05363V6.00916H51.3967V5.39657H51.3172C51.0177 5.83413 50.4841 6.08076 49.8102 6.08076ZM49.1364 4.76012C49.1364 5.1579 49.5341 5.39259 50.0817 5.39259C50.8398 5.39259 51.3967 4.97094 51.3967 4.41405V4.04411L50.1566 4.11173C49.4546 4.14753 49.1364 4.36233 49.1364 4.75216V4.76012ZM55.6881 6.08076C54.4105 6.08076 53.5821 5.20961 53.5821 3.85317V3.84522C53.5821 2.47684 54.3965 1.61366 55.6881 1.61366C56.3854 1.61366 56.9797 1.90801 57.2512 2.37342H57.3307V-0.0053215H58.3415V6.00916H57.3307V5.32895H57.2512C56.9564 5.80231 56.3994 6.08076 55.6881 6.08076ZM55.9782 5.34486C56.8253 5.34486 57.3447 4.77603 57.3447 3.85317V3.84522C57.3447 2.92236 56.8206 2.35353 55.9782 2.35353C55.1265 2.35353 54.6164 2.91838 54.6164 3.84522V3.85317C54.6164 4.78001 55.1265 5.34486 55.9782 5.34486ZM61.9871 6.09269C60.4989 6.09269 59.6004 5.2295 59.6004 3.86113V3.85715C59.6004 2.50867 60.5177 1.6057 61.9357 1.6057C63.3535 1.6057 64.224 2.47684 64.224 3.77362V4.07593H60.6206C60.6393 4.90332 61.1728 5.38464 62.0105 5.38464C62.6609 5.38464 63.0494 5.11017 63.1711 4.88741L63.1898 4.85559L64.1679 4.85161L64.1585 4.88741C63.99 5.45624 63.2881 6.09269 61.9871 6.09269ZM61.9402 2.31375C61.2477 2.31375 60.7235 2.71551 60.6346 3.45937H63.2179C63.1384 2.68767 62.6282 2.31375 61.9402 2.31375ZM70.0618 6.08076C69.3505 6.08076 68.7935 5.80231 68.4987 5.32895H68.4239V6.00916H67.4084V-0.0053215H68.4239V2.37342H68.4987C68.7702 1.90801 69.3645 1.61366 70.0618 1.61366C71.3534 1.61366 72.1678 2.47684 72.1678 3.84522V3.85317C72.1678 5.20961 71.3441 6.08076 70.0618 6.08076ZM69.7764 5.34486C70.6234 5.34486 71.1335 4.78001 71.1335 3.85317V3.84522C71.1335 2.91838 70.6234 2.35353 69.7764 2.35353C68.9293 2.35353 68.4052 2.92236 68.4052 3.84522V3.85317C68.4052 4.77603 68.9293 5.34486 69.7764 5.34486ZM73.6793 7.52869C73.5529 7.52869 73.4032 7.52073 73.2721 7.5088V6.82859C73.3705 6.84052 73.4968 6.8445 73.6138 6.8445C74.0865 6.8445 74.3672 6.67345 74.5217 6.23589L74.5966 6.01313L72.7527 1.68923H73.8478L75.1207 5.14199H75.2095L76.4778 1.68923H77.5448L75.6541 6.17622C75.2237 7.21046 74.7088 7.52869 73.6793 7.52869Z" fill="black"/>
					<path d="M95.25 21.2V10H97.202V21.2H95.25Z" fill="#010101"/>
					<path d="M92.3094 21.2L91.9734 19.696H90.0534L90.4694 17.776H91.4454L89.7174 10H91.6534L94.2454 21.2H92.3094ZM86.9494 21.2L89.0294 11.84H89.2854L90.0854 15.6L88.8534 21.2H86.9494Z" fill="#010101"/>
					<path d="M80.3914 24.352L81.9914 19.2L79.7834 12.24H81.7674L84.0074 19.232L82.3114 24.352H80.3914ZM84.2954 17.712L83.4634 14.944L84.4074 12.24H86.3914L84.4714 17.712H84.2954Z" fill="#010101"/>
					<path d="M74.9688 21.2V12.24H76.8568V13.312C76.9741 13.152 77.1341 12.9867 77.3368 12.816C77.5501 12.6453 77.8007 12.496 78.0887 12.368C78.3767 12.24 78.6807 12.176 79.0007 12.176C79.0754 12.176 79.1554 12.176 79.2407 12.176C79.3261 12.176 79.4114 12.176 79.4967 12.176L79.0648 14.032C78.6914 14.032 78.3341 14.1493 77.9927 14.384C77.6621 14.608 77.3901 14.896 77.1768 15.248C76.9634 15.5893 76.8568 15.9413 76.8568 16.304V21.2H74.9688Z" fill="#010101"/>
					<path d="M69.8851 21.2C69.3305 21.2 68.8505 21.0987 68.4451 20.896C68.0505 20.6827 67.7465 20.416 67.5331 20.096C67.3305 19.776 67.2291 19.4507 67.2291 19.12V18.32C67.2291 18.2027 67.2398 18.0533 67.2611 17.872C67.2931 17.68 67.3678 17.4827 67.4851 17.28C67.6025 17.0773 67.7998 16.9067 68.0771 16.768C68.2478 16.672 68.4771 16.576 68.7651 16.48C69.0638 16.384 69.3731 16.288 69.6931 16.192C70.0238 16.096 70.3331 15.9947 70.6211 15.888C70.9198 15.7707 71.1651 15.6533 71.3571 15.536C71.5491 15.4187 71.6451 15.2907 71.6451 15.152V14.816C71.6451 14.6347 71.6025 14.48 71.5171 14.352C71.4425 14.224 71.3358 14.1227 71.1971 14.048C71.0691 13.9733 70.9091 13.936 70.7171 13.936V12.24C71.3251 12.24 71.8265 12.3733 72.2211 12.64C72.6265 12.9067 72.9251 13.232 73.1171 13.616C73.3198 14 73.4211 14.3627 73.4211 14.704V18.96C73.4211 19.024 73.4425 19.1253 73.4851 19.264C73.5385 19.4027 73.6665 19.472 73.8691 19.472V21.2C73.5278 21.2 73.2345 21.152 72.9891 21.056C72.7545 20.96 72.5571 20.832 72.3971 20.672C72.1945 20.8427 71.9491 20.976 71.6611 21.072C71.3731 21.1573 71.0638 21.2 70.7331 21.2V19.488C70.9358 19.488 71.1011 19.4507 71.2291 19.376C71.3678 19.3013 71.4691 19.2 71.5331 19.072C71.6078 18.9333 71.6451 18.7893 71.6451 18.64V17.136C71.4531 17.2427 71.2238 17.3387 70.9571 17.424C70.7011 17.5093 70.4345 17.5893 70.1571 17.664C69.8905 17.728 69.6505 17.792 69.4371 17.856C69.2238 17.9093 69.0745 17.9627 68.9891 18.016C68.8611 18.0907 68.7971 18.2293 68.7971 18.432V18.736C68.7971 18.9067 68.8291 19.0507 68.8931 19.168C68.9678 19.2747 69.0851 19.3547 69.2451 19.408C69.4158 19.4613 69.6291 19.488 69.8851 19.488V21.2ZM68.9571 15.104L67.3411 14.48C67.3411 14.0533 67.4691 13.6747 67.7251 13.344C67.9811 13.0027 68.3065 12.736 68.7011 12.544C69.0958 12.3413 69.4958 12.24 69.9011 12.24V13.952C69.7198 13.952 69.5545 13.9947 69.4051 14.08C69.2665 14.1653 69.1545 14.2933 69.0691 14.464C68.9945 14.6347 68.9571 14.848 68.9571 15.104Z" fill="#010101"/>
					<path d="M61.183 21.2V19.392L64.191 14.048H61.183V12.256H66.303V14.032L63.359 19.392H66.303V21.2H61.183Z" fill="#010101"/>
					<path d="M55.9844 21.2V12.24H57.8724V13.312C57.9897 13.152 58.1497 12.9867 58.3524 12.816C58.5657 12.6453 58.8164 12.496 59.1044 12.368C59.3924 12.24 59.6964 12.176 60.0164 12.176C60.091 12.176 60.171 12.176 60.2564 12.176C60.3417 12.176 60.427 12.176 60.5124 12.176L60.0804 14.032C59.707 14.032 59.3497 14.1493 59.0084 14.384C58.6777 14.608 58.4057 14.896 58.1924 15.248C57.979 15.5893 57.8724 15.9413 57.8724 16.304V21.2H55.9844Z" fill="#010101"/>
					<path d="M50.9008 21.2C50.3461 21.2 49.8661 21.0987 49.4608 20.896C49.0661 20.6827 48.7621 20.416 48.5488 20.096C48.3461 19.776 48.2448 19.4507 48.2448 19.12V18.32C48.2448 18.2027 48.2554 18.0533 48.2768 17.872C48.3088 17.68 48.3834 17.4827 48.5008 17.28C48.6181 17.0773 48.8154 16.9067 49.0928 16.768C49.2634 16.672 49.4928 16.576 49.7808 16.48C50.0794 16.384 50.3888 16.288 50.7088 16.192C51.0394 16.096 51.3488 15.9947 51.6368 15.888C51.9354 15.7707 52.1808 15.6533 52.3728 15.536C52.5648 15.4187 52.6608 15.2907 52.6608 15.152V14.816C52.6608 14.6347 52.6181 14.48 52.5328 14.352C52.4581 14.224 52.3514 14.1227 52.2128 14.048C52.0848 13.9733 51.9248 13.936 51.7328 13.936V12.24C52.3408 12.24 52.8421 12.3733 53.2368 12.64C53.6421 12.9067 53.9408 13.232 54.1328 13.616C54.3354 14 54.4368 14.3627 54.4368 14.704V18.96C54.4368 19.024 54.4581 19.1253 54.5008 19.264C54.5541 19.4027 54.6821 19.472 54.8848 19.472V21.2C54.5434 21.2 54.2501 21.152 54.0048 21.056C53.7701 20.96 53.5728 20.832 53.4128 20.672C53.2101 20.8427 52.9648 20.976 52.6768 21.072C52.3888 21.1573 52.0794 21.2 51.7488 21.2V19.488C51.9514 19.488 52.1168 19.4507 52.2448 19.376C52.3834 19.3013 52.4848 19.2 52.5488 19.072C52.6234 18.9333 52.6608 18.7893 52.6608 18.64V17.136C52.4688 17.2427 52.2394 17.3387 51.9728 17.424C51.7168 17.5093 51.4501 17.5893 51.1728 17.664C50.9061 17.728 50.6661 17.792 50.4528 17.856C50.2394 17.9093 50.0901 17.9627 50.0048 18.016C49.8768 18.0907 49.8128 18.2293 49.8128 18.432V18.736C49.8128 18.9067 49.8448 19.0507 49.9088 19.168C49.9834 19.2747 50.1008 19.3547 50.2608 19.408C50.4314 19.4613 50.6448 19.488 50.9008 19.488V21.2ZM49.9728 15.104L48.3568 14.48C48.3568 14.0533 48.4848 13.6747 48.7408 13.344C48.9968 13.0027 49.3221 12.736 49.7168 12.544C50.1114 12.3413 50.5114 12.24 50.9168 12.24V13.952C50.7354 13.952 50.5701 13.9947 50.4208 14.08C50.2821 14.1653 50.1701 14.2933 50.0848 14.464C50.0101 14.6347 49.9728 14.848 49.9728 15.104Z" fill="#010101"/>
					<path d="M46.192 21.2L40 11.264V10H41.616L47.12 18.864V21.2H46.192ZM40 21.2V13.008H40.128L41.952 15.936V21.2H40ZM46.992 17.104L45.168 14.176V10H47.12V17.104H46.992Z" fill="#010101"/>
					</g>
					<defs>
					<clipPath id="clip0_5_2">
					<rect width="100" height="24" fill="#010101"/>
					</clipPath>
					</defs>
				</svg>

			</AccessibleIcon>
		</BoxLink>
	</Flex>
);
