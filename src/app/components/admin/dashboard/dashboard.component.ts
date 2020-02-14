import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../../services/http.service';
import { ContributorsReq, ContributorDetails } from '../../../models/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any;
  contributorDetails: ContributorDetails[];
  constructor(private http: HttpService) {

  }

  ngOnInit() {
    this.getContributors();

    this.data = {
      datasets: [{
        data: [
          11,
          16,
          7,
          3,
          14
        ],
        backgroundColor: [
          '#FF6384',
          '#4BC0C0',
          '#FFCE56',
          '#E7E9ED',
          '#36A2EB'
        ],
        label: 'My dataset'
      }],
      labels: [
        'wild life',
        'Kelara floods',
        'Odisa earth quake',
        'Amazon Forest fire',
        'Education Donation'
      ]
    };

  }

  getContributors() {
    const shemeId = 1001;
    const endpoint = `${environment.logUrl}/${shemeId}/contributors`;
    this.http.readData(endpoint).subscribe(
      (res: ContributorsReq) => {
        this.contributorDetails = res.contributorDetails;
        console.log(this.contributorDetails);
      }
    );
  }

}
