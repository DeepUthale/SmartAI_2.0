const LandingLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className="min-h-full bg-[#030305] overflow-x-hidden">
            {children}
        </main>
    );
}

export default LandingLayout;
