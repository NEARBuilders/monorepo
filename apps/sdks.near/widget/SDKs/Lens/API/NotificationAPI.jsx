const $ = VM.require(`sdks.near/widget/Loader`);
const { Notification } = $("@sdks/lens/queries#alpha");
const { NotificationRequests } = $("@sdks/lens/requests#alpha");
const { ApiHelper } = $("@sdks/lens/utils#alpha");

return {
  fetch: (Client, notificationRequest) => {
    return Client.graphql(Notification.NOTIFICATION_QUERY, {
      notificationRequest: ApiHelper.clean(notificationRequest)
    }).then((payload) => {
      return {
        notifications: payload.body.data.notifications.items || [],
        pagination: payload.body.data.notifications.pageInfo || {},
      };
    });
  },
};
