import "./Home.css";
import Activities from "@/appcomponents/Activities";
import ActivityAdd from "@/appcomponents/modals/ActivityAdd";
import DashboardHeader from "@/appcomponents/DashboardHeader";
import Header from "@/appcomponents/Header";
import MainMethodContainer from "@/appcomponents/MainMethodContainer";

function Home() {
  return (
    <main>
      <Header />
      <DashboardHeader />
      <MainMethodContainer />
      <Activities />
      <ActivityAdd />
    </main>
  );
}

export default Home;
