import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { NewsDetails, NewsResponse } from "src/app/model/news-details";
import * as Highcharts from "highcharts";

@Component({
  selector: "app-news-details",
  templateUrl: "./news-details.component.html",
  styleUrls: ["./news-details.component.css"],
})
export class NewsDetailsComponent implements OnInit {
  newsDetailsList: NewsDetails[];
  highcharts = Highcharts;
  chartOptions: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadNewsDetailsFirstPage();
    JSON.parse(localStorage.getItem("hiddenRow"));
  }

  loadNewsDetailsFirstPage() {
    this.apiService.getNewsDetailsFirstPage().subscribe((newsReponse) => {
      this.newsDetailsList = newsReponse.hits;
      for (const iterator of this.newsDetailsList) {
        iterator.deleted = false;
        iterator.voteNumber = 0;
      }
      this.initialiseChart();
    });
  }
  loadNewsDetailsNextPage() {
    this.apiService.getNewsDetailsNextPage().subscribe((newsReponse) => {
      this.newsDetailsList = newsReponse.hits;
      for (const iterator of this.newsDetailsList) {
        iterator.deleted = false;
        iterator.voteNumber = 0;
      }
      this.initialiseChart();
    });
  }
  getObjIds(): number[] {
    return this.newsDetailsList
      .filter((hit) => !hit.deleted)
      .map((hit) => hit.objectID);
  }

  getVotes() {
    JSON.parse(localStorage.getItem("upVotes"));
    return this.newsDetailsList
      .filter((hit) => !hit.deleted)
      .map((hit) => hit.voteNumber);
  }

  onHideRow(item) {
    item.deleted = true;
    this.initialiseChart();
    localStorage.setItem(
      "hiddenRow",
      JSON.stringify([item.objectID, item.deleted])
    );
  }

  onUpVote(item) {
    item.voteNumber += 1;
    this.initialiseChart();
    localStorage.setItem(
      "upVotes",
      JSON.stringify([item.objectID, item.voteNumber])
    );
  }

  initialiseChart() {
    this.chartOptions = {
      chart: {
        type: "spline",
      },

      xAxis: {
        title: {
          text: "ID",
        },

        categories: this.getObjIds(),
      },

      yAxis: {
        title: {
          text: "Votes",
        },
      },
      tooltip: {
        valueSuffix: " No:",
      },
      series: [
        {
          data: this.getVotes(),
        },
      ],
    };
  }
}
