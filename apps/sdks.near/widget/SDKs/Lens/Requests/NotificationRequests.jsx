const NOTIFICATION_WHERE = {
  publishedOn: [],
  customFilters: ["GARDENERS"],
  highSignalFilter: false,
  notificationTypes: []
};

const NOTIFICATION_REQUEST = {
  cursor: "",
  where: NOTIFICATION_WHERE
};

return {
  NOTIFICATION_REQUEST,
  NOTIFICATION_WHERE
};
