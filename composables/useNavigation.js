const communitiesData = {
  name: "communities",
  fetchUrl: "/api/groups/members?group_id=",
  sectionPlaceholder: "Group id (number)",
  sectionTitle: "Filter members",
};

const postsData = {
  name: "posts",
  fetchUrl: "/api/posts/likes?url=",
  sectionPlaceholder: "https://vk.com/groupDomen?w=wall-groud-id_post-id",
  sectionTitle: "Filter likes in posts",
};

const friendsData = {
  name: "users",
  fetchUrl: "/api/users/friends?id=",
  sectionPlaceholder: "User id",
  sectionTitle: "Filter user's friends",
};

const sections = [communitiesData, postsData, friendsData];

export const currentSection = ref(communitiesData);

export const setCurrentSection = (name) => {
  currentSection.value = sections.find((section) => section.name === name);
};
