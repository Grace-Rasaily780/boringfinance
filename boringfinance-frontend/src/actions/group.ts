import api from "@/actions/api";
import useStore, { group } from "@/store";

export async function fetchGroups(id: string) {
  const { updateGroup } = useStore.getState();
  try {
    const { data } = await api.get(`/method503020/${id}`);
    updateGroup(data.group);
  } catch (e) {
    console.log(e);
  }
}

export async function updateGroupApi(id: string, updatedGroup: group[]) {
  try {
    await api.post(`/method503020/updategroup/${id}`, updatedGroup);
  } catch (e) {
    console.log(e);
  }
}

export async function updateSize(id: string, update: group) {
  const { groups } = useStore.getState();

  const updatedGroups = groups.map((group) => {
    if (group.id === update.id) {
      return {
        ...group,
        size: update.size,
      };
    }
    return group;
  });

  updateGroupApi(id, updatedGroups);
}
