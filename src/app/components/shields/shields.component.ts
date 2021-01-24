import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../services/web-api.service';
import { SharedService } from "../../shared/shared.service"

@Component({
  selector: 'app-shields',
  templateUrl: './shields.component.html',
  styleUrls: ['./shields.component.scss']
})
export class ShieldsComponent implements OnInit {

  characters = null;
  houses = [
    {
      "house": "Gryffindor",
      "shield": "https://wallpaperplay.com/walls/full/e/7/8/176464.jpg",
      "numberOfMembers": 0,
      "students": [{}]
    },
    {
      "house": "Slytherin",
      "shield": "https://wallpaperplay.com/walls/full/8/c/9/3137.jpg",
      "numberOfMembers": 0,
      "students": [{}]
    },
    {
      "house": "Hufflepuff",
      "shield": "https://wallpapercave.com/wp/wp1958756.jpg",
      "numberOfMembers": 0,
      "students": [{}]
    },
    {
      "house": "Ravenclaw",
      "shield": "https://crystalbridges.org/wp-content/uploads/2019/07/ravenclaw.jpg",
      "numberOfMembers": 0,
      "students": [{}]
    }
  ];

  constructor(private webApi: WebApiService, private shared: SharedService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.webApi.fetchData()
      .subscribe(data => {
        this.characters = data
        this.characters = this.cleanData(this.characters);
      });
  }

  cleanData(characters) {
    characters.forEach(member => {
      member = this.separateName(member);
      switch (member.house) {
        case "Gryffindor":
          this.houses[0].numberOfMembers += 1;
          this.houses[0].students.push(member);
          break;
        case "Slytherin":
          this.houses[1].numberOfMembers += 1;
          this.houses[1].students.push(member);
          break;
        case "Hufflepuff":
          this.houses[2].numberOfMembers += 1;
          this.houses[2].students.push(member);
          break;
        case "Ravenclaw":
          this.houses[3].numberOfMembers += 1;
          this.houses[3].students.push(member);
          break;
        default:

      }
    });
  }

  separateName(member) {
    let completeName = member.name.split(" ");
    if (completeName.length == 3) {
      member.name = `${completeName[0]} ${completeName[1]}`;
      member.lastname = completeName[2];
    } else {
      member.name = completeName[0];
      member.lastname = completeName[1]
    }
    return (member);
  }

  showMembers(house) {
    switch (house) {
      case "Gryffindor":
        this.shared.sendMembers(this.houses[0].students);
        break;
      case "Slytherin":
        this.shared.sendMembers(this.houses[1].students);
        break;
      case "Hufflepuff":
        this.shared.sendMembers(this.houses[2].students);
        break;
      case "Ravenclaw":
        this.shared.sendMembers(this.houses[3].students);
        break;
      default:

    }
  }
}
