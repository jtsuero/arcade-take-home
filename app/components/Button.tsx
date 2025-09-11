import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
	route?: string;
	text?: string;
	variant?: "primary" | "secondary" | "link";
	className?: string;
	children?: ReactNode;
	disabled?: boolean;
	type?: "button" | "submit";
}

export default function Button({
	route,
	text,
	variant = "primary",
	className = "",
	children,
	disabled = false,
	type = "button",
}: ButtonProps) {
	const baseClasses =
		"px-6 py-2 rounded-lg font-medium transition-colors inline-block text-center";

	const variantClasses = {
		primary: "bg-blue-600 hover:bg-blue-700 text-white",
		secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
		link: "text-blue-600 hover:text-blue-700 bg-blue-500/10 hover:bg-blue-500/20",
	};

	const combinedClasses = `${baseClasses} ${
		variantClasses[variant]
	} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

	if (route) {
		return (
			<Link href={route} className={combinedClasses}>
				{children || text}
			</Link>
		);
	}

	return (
		<button type={type} className={combinedClasses} disabled={disabled}>
			{children || text}
		</button>
	);
}
