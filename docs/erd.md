Enum UserRole {
  Adopter
  Shelter
  Admin
}

Enum Species {
  Dog
  Cat
  Bird
  Rabbit
  Other
}

Enum Gender {
  Male
  Female
  Unknown
}

Enum HealthStatus {
  Healthy
  UnderTreatment
  SpecialNeeds
}

Enum AdoptionStatus {
  Available
  Pending
  Adopted
}

Table User {
  id int [pk]
  role UserRole
}

Table Pet {
  id int [pk]

  shelter_id int [not null, ref: > User.id]

  name varchar
  species Species
  breed varchar

  dob date [note: 'Nullable']
  estimated_age int

  gender Gender

  description text

  vaccinated boolean

  image varchar

  health_status HealthStatus

  adoption_status AdoptionStatus

  is_neutered boolean

  created_at datetime
  updated_at datetime
}

Table Application {
  id int [pk]

  pet_id int [ref: > Pet.id]
}

For detailed ERD pls refer here
https://dbdiagram.io/d/6a461e7636d348d1204fa597