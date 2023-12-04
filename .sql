
select exists (select *
    from information_schema.tables
    where table_name = 'Users'
    and table_schema = 'public') as table_exists;