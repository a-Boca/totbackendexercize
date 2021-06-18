create table client
(
    mail varchar not null
        constraint client_pk
            primary key,
    name varchar
);

alter table client
    owner to postgres;

create unique index client_mail_uindex
    on client (mail);

INSERT INTO public.client (mail, name) VALUES ('mariorossi@gmail.com', 'Mario');
INSERT INTO public.client (mail, name) VALUES ('luigiverdi@yahoo.it', 'Luigi');
INSERT INTO public.client (mail, name) VALUES ('test@test.it', 'Test');
INSERT INTO public.client (mail, name) VALUES ('teeeest@test.it', 'Test');
INSERT INTO public.client (mail, name) VALUES ('ffffg@test.it', 'Test');
INSERT INTO public.client (mail, name) VALUES ('dwddww@test.it', 'Test');