create table reservation
(
    mail                   varchar
        constraint mail
            references client,
    date                   date,
    time                   time,
    table_id               char,
    seats                  integer,
    allow_strangers_people boolean
);

alter table reservation
    owner to postgres;

INSERT INTO public.reservation (mail, date, time, table_id, seats, allow_strangers_people) VALUES ('mariorossi@gmail.com', '2021-06-17', '19:00:00', 'C', 123, true);
INSERT INTO public.reservation (mail, date, time, table_id, seats, allow_strangers_people) VALUES ('test@test.it', '2021-06-17', '19:00:00', 'A', 12, true);
INSERT INTO public.reservation (mail, date, time, table_id, seats, allow_strangers_people) VALUES ('test@test.it', '2021-06-17', '19:00:00', 'A', 12, true);
INSERT INTO public.reservation (mail, date, time, table_id, seats, allow_strangers_people) VALUES ('test@test.it', '2021-06-17', '19:00:00', 'A', 34, true);
INSERT INTO public.reservation (mail, date, time, table_id, seats, allow_strangers_people) VALUES ('test@test.it', '2020-05-23', '20:00:00', 'A', 34, true);
INSERT INTO public.reservation (mail, date, time, table_id, seats, allow_strangers_people) VALUES ('test@test.it', '2021-06-01', '20:00:00', 'A', 34, true);
INSERT INTO public.reservation (mail, date, time, table_id, seats, allow_strangers_people) VALUES ('test@test.it', '2021-06-01', '18:00:00', 'A', 34, true);
INSERT INTO public.reservation (mail, date, time, table_id, seats, allow_strangers_people) VALUES ('test@test.it', '2021-06-01', '22:00:00', 'A', 34, true);