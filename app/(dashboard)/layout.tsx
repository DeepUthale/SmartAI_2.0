import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({
    children
} : {
    children: React.ReactNode;
}) => {

    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                <Sidebar isPro={isPro} apiLimitCount = {apiLimitCount} />
            </div> 
            <main className="md:pl-64 bg-background h-screen flex flex-col overflow-hidden">
                <Navbar />
                <div className="flex-1 overflow-auto min-h-0">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default DashboardLayout;