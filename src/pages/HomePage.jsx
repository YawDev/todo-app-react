import HeroSectionComponent from "../components/HeroSectionComponent";

const HomePage = ({ userContext, isLoggedIn }) => {
  return (
    <HeroSectionComponent userContext={userContext} isLoggedIn={isLoggedIn} />
  );
};

export default HomePage;
