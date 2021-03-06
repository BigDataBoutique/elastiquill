import { observable, action } from "mobx";
import BaseStore from "./BaseStore";
import * as api from "../api";

class Dashboard extends BaseStore {
  @observable
  visitsByLocation = [];

  @observable
  visitsByCountry = [];

  @observable
  averageVisitsPerDay = null;

  @observable
  averageVisitorsPerDay = null;

  @observable
  mostBusyDayEver = null;

  @observable
  mostViewedPost = null;

  @observable
  popularPosts = [];

  @observable
  recentComments = [];

  @observable
  commentsCount = null;

  @observable
  postsCount = null;

  @observable
  uniqueVisitorsEnabled = false;

  @observable
  mostCommentedPosts = [];

  @observable
  referrerType = [];

  @observable
  referrerFromDomain = [];

  @observable
  userAgentOperatingSystem = [];

  @observable
  userAgentName = [];

  async loadStats() {
    this.loading("stats");

    try {
      const commentsData = await api.loadCommentsStats();
      this.commentsCount = commentsData.comments_count;
      this.recentComments = commentsData.recent_comments;
      this.mostCommentedPosts = commentsData.most_commented_posts;

      const allStats = await api.loadAllStats();
      this.visitsByLocation = allStats.visits_by_location;
      this.visitsByCountry = allStats.visits_by_country;
      this.popularPosts = allStats.popular_posts;
      this.referrerType = allStats.referrer_type;
      this.referrerFromDomain = allStats.referrer_from_domain;
      this.postsCount = allStats.posts_count;
      this.averageVisitsPerDay = allStats.avg_visits_per_day;
      this.averageVisitorsPerDay = allStats.avg_visitors_per_day;
      this.mostBusyDayEver = allStats.most_busy_day;
      this.mostViewedPost = allStats.most_viewed_post;
      this.userAgentOperatingSystem = allStats.user_agent_os;
      this.userAgentName = allStats.user_agent_name;
    } catch (err) {
      console.error(err);
    } finally {
      this.loaded("stats");
    }
  }

  @action
  toggleUniqueVisitors() {
    this.uniqueVisitorsEnabled = !this.uniqueVisitorsEnabled;
  }
}

const dashboardStore = new Dashboard();
export default dashboardStore;
