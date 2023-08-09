const communitiesData = {
  name: "communities",
  fetchUrl: "/api/groups/members?group_id=",
  sectionPlaceholder: "communitiesPlaceholder",
  sectionTitle: "communitiesTitle",
  amountText: "communitiesAmount",
};

const postsData = {
  name: "posts",
  fetchUrl: "/api/posts/likes?url=",
  sectionPlaceholder: "https://vk.com/groupDomen?w=wall-groud-id_post-id",
  sectionTitle: "postsTitle",
  amountText: "postsAmount",
};

const friendsData = {
  name: "users",
  fetchUrl: "/api/users/friends?id=",
  sectionPlaceholder: "friendsPlaceholder",
  sectionTitle: "friendsTitle",
  amountText: "friendsAmount",
};

const sections = [communitiesData, postsData, friendsData];

export const currentSection = ref(communitiesData);

export const setCurrentSection = (name) => {
  currentSection.value = sections.find((section) => section.name === name);
};
