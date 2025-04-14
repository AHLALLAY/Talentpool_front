import NavBarOpearator from "../../components/operator/NavBarOpearator";
import PostCard from "./PostCard";

export default function dashboard(){


    return (
        <div className="pt-20">
            <NavBarOpearator />
            <main className="p-6">
                <PostCard />
            </main>
        </div>
    );
}