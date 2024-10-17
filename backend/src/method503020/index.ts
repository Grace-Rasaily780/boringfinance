import { Elysia } from "elysia";
import Method503020 from "../model/503020Model";
import { totalPercenatageCalc, verifyToken } from "../utils";

export const method503020 = new Elysia()
  .onBeforeHandle(({ headers, set }) => {
    if (!headers.authorization) {
      set.status = 400;
      set.headers["WWW-Authenticate"] = `realm='sign', error="invalid_request"`;

      return "Unauthorized";
    } else {
      verifyToken(headers.authorization);
    }
  })
  .get("/:id", async ({ params: { id } }: { params: { id: string } }) => {
    let method = await Method503020.findOne({ user: id });

    return method;
  })
  .put(
    "/creategroup/:id",
    async ({ params: { id }, body }: { params: { id: string }; body: any }) => {
      let groups: any = await Method503020.findOne({ user: id });
      let totalPercentage: number = totalPercenatageCalc(groups.group);

      if (totalPercentage == 100) {
        return { message: "No space to create a group" };
      } else {
        groups.group.push({ label: body.label, percentage: body.percentage });

        let method = await Method503020.findByIdAndUpdate(
          groups.id,
          { $set: { group: groups.group } },
          { new: true },
        );

        return { update: method, status: "Group Created" };
      }
    },
  )
  .post(
    "/updategroup/:id",
    async ({ params: { id }, body }: { params: { id: string }; body: any }) => {
      let method = await Method503020.findOneAndUpdate(
        { user: id },
        { $set: { group: body } },
        { new: true },
      );

      return { update: method, status: "Group Update" };
    },
  )
  .put(
    "/createcategory/:id",
    async ({ params: { id }, body }: { params: { id: string }; body: any }) => {
      let category: any = await Method503020.findOne({ user: id });

      category.category.push({ label: body.label });

      let method = await Method503020.findByIdAndUpdate(
        category.id,
        { $set: { category: category.category } },
        { new: true },
      );

      return { update: method, status: "Category Created" };
    },
  );
