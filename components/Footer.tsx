import * as React from "react";
import NextLink from "next/link";
import {
	Box,
	Grid,
	Text,
	Flex,
	Link,
	Heading,
	AccessibleIcon,
} from "@radix-ui/themes";
import { RadixLogo } from "./RadixLogo";
import { useRouter } from "next/router";
import { BoxLink } from "./BoxLink";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import styles from "./Footer.module.css";

export const Footer = () => {
	const router = useRouter();
	const isColors = router.pathname.includes("/company");

	return (
		<Grid asChild pb="9" gapX="7" gapY="3" className={styles.Footer}>
			<footer>
				<Flex
					align="start"
					direction="column"
					className={styles.RadixLogo}
					mb="5"
				>
					<NextLink href="/" passHref legacyBehavior>
						<BoxLink>
							<AccessibleIcon label="Radix Homepage">
								<RadixLogo />
							</AccessibleIcon>
						</BoxLink>
					</NextLink>
					<Box pr="8" mt="5">
						<Heading
							as="h6"
							size="2"
							style={{
								lineHeight: "20px",
								color: "var(--gray-10)",
								fontWeight: "inherit",
							}}
						>
							A project by{" "}
							<Link color="gray" href="https://www.narzary.com">
								NarzaryAI
							</Link>
							.
						</Heading>
					</Box>
					<Box mt="5">
						<Heading as="h6" size="3">
							Legal
						</Heading>
						<ul>
							<li>
								<Text as="p" size="2" mt="3">
									<NextLink href="/privacy" passHref legacyBehavior>
										<Link color="gray">Privacy Policy</Link>
									</NextLink>
								</Text>
							</li>
							<li>
								<Text as="p" size="2" mt="3">
									<NextLink href="/return-refund" passHref legacyBehavior>
										<Link color="gray">Return &amp; Refund Policy</Link>
									</NextLink>
								</Text>
							</li>
							<li>
								<Text as="p" size="2" mt="3">
									<NextLink href="/shipping" passHref legacyBehavior>
										<Link color="gray">Shipping Policy</Link>
									</NextLink>
								</Text>
							</li>
						</ul>
					</Box>
				</Flex>
				<Box>
					<Heading as="h6" size="3">
						Highlights
					</Heading>
					<ul>
						<li>
							<Text as="p" size="2" mt="3">
								<NextLink href="/" passHref legacyBehavior>
									<Link color="gray">SeekGPT</Link>
								</NextLink>
							</Text>
						</li>
						<li>
							<Text as="p" size="2" mt="3">
								<NextLink href="/research" passHref legacyBehavior>
									<Link color="gray">Research and Developments</Link>
								</NextLink>
							</Text>
						</li>
						<li>
							<Text as="p" size="2" mt="3">
								<NextLink href="/products" passHref legacyBehavior>
									<Link color="gray">Products and Models</Link>
								</NextLink>
							</Text>
						</li>
						<li>
							<Text as="p" size="2" mt="3">
								<NextLink href="/developer" passHref legacyBehavior>
									<Link color="gray">Developer Docs</Link>
								</NextLink>
							</Text>
						</li>
						<li>
							<Text as="p" size="2" mt="3">
								<NextLink href="https://platform.seekgpt.org/pricing" passHref legacyBehavior>
									<Link color="gray">Pricing</Link>
								</NextLink>
							</Text>
						</li>
						<li>
							<Text as="p" size="2" mt="3">
								<NextLink href="/company" passHref legacyBehavior>
									<Link color="gray">Company</Link>
								</NextLink>
							</Text>
						</li>
					</ul>
				</Box>
				{isColors === false && (
					<Box>
						<Heading as="h6" size="3">
							Docs
						</Heading>
						<ul>
							<li>
								<Text as="p" size="2" mt="3">
									<NextLink
										href="/products/docs/overview/introduction"
										passHref
										legacyBehavior
									>
										<Link color="gray">Introduction</Link>
									</NextLink>
								</Text>
							</li>
							<li>
								<Text as="p" size="2" mt="3">
									<NextLink
										href="/products/docs/guides/styling"
										passHref
										legacyBehavior
									>
										<Link color="gray">Styling</Link>
									</NextLink>
								</Text>
							</li>
							<li>
								<Text as="p" size="2" mt="3">
									<NextLink
										href="/products/docs/overview/accessibility"
										passHref
										legacyBehavior
									>
										<Link color="gray">Accessibility</Link>
									</NextLink>
								</Text>
							</li>
							<li>
								<Text as="p" size="2" mt="3">
									<NextLink
										href="/products/docs/overview/releases"
										passHref
										legacyBehavior
									>
										<Link color="gray">Releases</Link>
									</NextLink>
								</Text>
							</li>
						</ul>
					</Box>
				)}
				{isColors && (
					<Box>
						<Heading as="h6" size="3">
							Docs
						</Heading>
						<ul>
							<li>
								<Text as="p" size="2" mt="3">
									<NextLink
										href="/company/docs/overview/about-us"
										passHref
										legacyBehavior
									>
										<Link color="gray">About Us</Link>
									</NextLink>
								</Text>
							</li>
							<li>
								<Text as="p" size="2" mt="3">
									<NextLink
										href="/company/docs/palette-composition/scales"
										passHref
										legacyBehavior
									>
										<Link color="gray">Scales</Link>
									</NextLink>
								</Text>
							</li>
							<li>
								<Text as="p" size="2" mt="3">
									<NextLink
										href="/company/docs/palette-composition/composing-a-palette"
										passHref
										legacyBehavior
									>
										<Link color="gray">Palette composition</Link>
									</NextLink>
								</Text>
							</li>
							<li>
								<Text as="p" size="2" mt="3">
									<NextLink
										href="/company/docs/palette-composition/understanding-the-scale"
										passHref
										legacyBehavior
									>
										<Link color="gray">Understanding the scale</Link>
									</NextLink>
								</Text>
							</li>
						</ul>
					</Box>
				)}
				<Box>
					<Heading as="h6" size="3">
						Community
					</Heading>
					<ul>
						<li>
							<Text as="p" size="2" mt="3">
								<Link
									href="https://github.com/seekgpt"
									color="gray"
									target="_blank"
									style={{ display: "inline-flex", alignItems: "center" }}
								>
									GitHub
									<Flex asChild ml="2" style={{ color: "var(--gray-8)" }}>
										<ArrowTopRightIcon />
									</Flex>
								</Link>
							</Text>
						</li>
						<li>
							<Text as="p" size="2" mt="3">
								<Link
									href="https://fb.com/seekgpt"
									color="gray"
									target="_blank"
									style={{ display: "inline-flex", alignItems: "center" }}
								>
									Facebook
									<Flex asChild ml="2" style={{ color: "var(--gray-8)" }}>
										<ArrowTopRightIcon />
									</Flex>
								</Link>
							</Text>
						</li>
						<li>
							<Text as="p" size="2" mt="3">
								<Link
									href="https://twitter.com/seekgpt"
									color="gray"
									target="_blank"
									style={{ display: "inline-flex", alignItems: "center" }}
								>
									Twitter
									<Flex asChild ml="2" style={{ color: "var(--gray-8)" }}>
										<ArrowTopRightIcon />
									</Flex>
								</Link>
							</Text>
						</li>
						<li>
							<Text as="p" size="2" mt="3">
								<Link
									href="https://huggingface.co/seekgpt"
									color="gray"
									target="_blank"
									style={{ display: "inline-flex", alignItems: "center" }}
								>
									Huggingface
									<Flex asChild ml="2" style={{ color: "var(--gray-8)" }}>
										<ArrowTopRightIcon />
									</Flex>
								</Link>
							</Text>
						</li>
					</ul>
				</Box>
			</footer>
		</Grid>
	);
};
