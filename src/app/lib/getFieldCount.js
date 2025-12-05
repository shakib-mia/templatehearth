export async function getFieldCount(collection, fieldName) {
  const result = await collection
    .aggregate([
      {
        // template-wise duplicates remove
        $set: {
          [fieldName]: { $setUnion: [`$${fieldName}`, []] },
        },
      },
      {
        // lowercase + space → hyphen (slugify)
        $set: {
          [fieldName]: {
            $map: {
              input: `$${fieldName}`,
              as: "item",
              in: {
                $replaceAll: {
                  input: { $toLower: "$$item" },
                  find: " ",
                  replacement: "-",
                },
              },
            },
          },
        },
      },
      { $unwind: `$${fieldName}` }, // array element আলাদা করা
      { $group: { _id: `$${fieldName}`, count: { $sum: 1 } } }, // global count
      { $project: { label: "$_id", count: 1, _id: 0 } },
      { $sort: { count: -1 } },
    ])
    .toArray();

  return result;
}
