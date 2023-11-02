SELECT "TrackId", "Name", "AlbumId", "MediaTypeId", "GenreId", "Composer", "Milliseconds", "Bytes", "UnitPrice"
	FROM public."Track";
	
	
select * from public."MediaType";

select DISTINCT EXTRACT(YEAR FROM "InvoiceDate") from public."Invoice" order by 1 ;


select * from public."Artist";

select distinct "Country" from public."Customer";



--- update the media type

update public."MediaType" 
	set "Name"='DVD' where "MediaTypeId"=1;
	
	
update public."MediaType" 
	set "Name"='CD' where "MediaTypeId"=2;
	
update public."MediaType" 
	set "Name"='VINYL' where "MediaTypeId"=3;
	
update public."MediaType" 
	set "Name"='CASSETTE' where "MediaTypeId"=4;
	
update public."MediaType" 
	set "Name"='BLUE-RAY' where "MediaTypeId"=5;



------------------------------------------------------------

-- update customer table

select * from public."Customer"

alter table public."Customer"
add column Age INTEGER

alter table public."Customer"
add column Occupation VARCHAR(255)





UPDATE public."Customer" SET "age" = 46, "occupation" = 'programmer' WHERE "CustomerId" = 1;
UPDATE public."Customer" SET "age" = 48, "occupation" = 'programmer' WHERE "CustomerId" = 2;
UPDATE public."Customer" SET "age" = 26, "occupation" = 'doctor' WHERE "CustomerId" = 3;
UPDATE public."Customer" SET "age" = 21, "occupation" = 'doctor' WHERE "CustomerId" = 4;
UPDATE public."Customer" SET "age" = 54, "occupation" = 'teacher' WHERE "CustomerId" = 5;
UPDATE public."Customer" SET "age" = 50, "occupation" = 'teacher' WHERE "CustomerId" = 6;
UPDATE public."Customer" SET "age" = 35, "occupation" = 'journalist' WHERE "CustomerId" = 7;
UPDATE public."Customer" SET "age" = 30, "occupation" = 'journalist' WHERE "CustomerId" = 8;
UPDATE public."Customer" SET "age" = 52, "occupation" = 'cook' WHERE "CustomerId" = 9;
UPDATE public."Customer" SET "age" = 40, "occupation" = 'cook' WHERE "CustomerId" = 10;
UPDATE public."Customer" SET "age" = 53, "occupation" = 'unemployed' WHERE "CustomerId" = 11;
UPDATE public."Customer" SET "age" = 35, "occupation" = 'unemployed' WHERE "CustomerId" = 12;
UPDATE public."Customer" SET "age" = 38, "occupation" = 'programmer' WHERE "CustomerId" = 13;
UPDATE public."Customer" SET "age" = 26, "occupation" = 'programmer' WHERE "CustomerId" = 14;
UPDATE public."Customer" SET "age" = 36, "occupation" = 'doctor' WHERE "CustomerId" = 15;
UPDATE public."Customer" SET "age" = 49, "occupation" = 'doctor' WHERE "CustomerId" = 16;
UPDATE public."Customer" SET "age" = 29, "occupation" = 'teacher' WHERE "CustomerId" = 17;
UPDATE public."Customer" SET "age" = 24, "occupation" = 'teacher' WHERE "CustomerId" = 18;
UPDATE public."Customer" SET "age" = 48, "occupation" = 'journalist' WHERE "CustomerId" = 19;
UPDATE public."Customer" SET "age" = 46, "occupation" = 'journalist' WHERE "CustomerId" = 20;
UPDATE public."Customer" SET "age" = 28, "occupation" = 'cook' WHERE "CustomerId" = 21;
UPDATE public."Customer" SET "age" = 56, "occupation" = 'cook' WHERE "CustomerId" = 22;
UPDATE public."Customer" SET "age" = 50, "occupation" = 'unemployed' WHERE "CustomerId" = 23;
UPDATE public."Customer" SET "age" = 42, "occupation" = 'unemployed' WHERE "CustomerId" = 24;
UPDATE public."Customer" SET "age" = 45, "occupation" = 'programmer' WHERE "CustomerId" = 25;
UPDATE public."Customer" SET "age" = 32, "occupation" = 'programmer' WHERE "CustomerId" = 26;
UPDATE public."Customer" SET "age" = 49, "occupation" = 'doctor' WHERE "CustomerId" = 27;
UPDATE public."Customer" SET "age" = 55, "occupation" = 'doctor' WHERE "CustomerId" = 28;
UPDATE public."Customer" SET "age" = 35, "occupation" = 'teacher' WHERE "CustomerId" = 29;
UPDATE public."Customer" SET "age" = 24, "occupation" = 'teacher' WHERE "CustomerId" = 30;
UPDATE public."Customer" SET "age" = 38, "occupation" = 'journalist' WHERE "CustomerId" = 31;
UPDATE public."Customer" SET "age" = 29, "occupation" = 'journalist' WHERE "CustomerId" = 32;
UPDATE public."Customer" SET "age" = 22, "occupation" = 'cook' WHERE "CustomerId" = 33;
UPDATE public."Customer" SET "age" = 50, "occupation" = 'cook' WHERE "CustomerId" = 34;
UPDATE public."Customer" SET "age" = 51, "occupation" = 'unemployed' WHERE "CustomerId" = 35;
UPDATE public."Customer" SET "age" = 31, "occupation" = 'unemployed' WHERE "CustomerId" = 36;
UPDATE public."Customer" SET "age" = 48, "occupation" = 'programmer' WHERE "CustomerId" = 37;
UPDATE public."Customer" SET "age" = 31, "occupation" = 'programmer' WHERE "CustomerId" = 38;
UPDATE public."Customer" SET "age" = 58, "occupation" = 'doctor' WHERE "CustomerId" = 39;
UPDATE public."Customer" SET "age" = 26, "occupation" = 'doctor' WHERE "CustomerId" = 40;
UPDATE public."Customer" SET "age" = 31, "occupation" = 'teacher' WHERE "CustomerId" = 41;
UPDATE public."Customer" SET "age" = 41, "occupation" = 'teacher' WHERE "CustomerId" = 42;
UPDATE public."Customer" SET "age" = 30, "occupation" = 'journalist' WHERE "CustomerId" = 43;
UPDATE public."Customer" SET "age" = 30, "occupation" = 'journalist' WHERE "CustomerId" = 44;
UPDATE public."Customer" SET "age" = 43, "occupation" = 'cook' WHERE "CustomerId" = 45;
UPDATE public."Customer" SET "age" = 26, "occupation" = 'cook' WHERE "CustomerId" = 46;
UPDATE public."Customer" SET "age" = 33, "occupation" = 'unemployed' WHERE "CustomerId" = 47;
UPDATE public."Customer" SET "age" = 29, "occupation" = 'unemployed' WHERE "CustomerId" = 48;
UPDATE public."Customer" SET "age" = 23, "occupation" = 'programmer' WHERE "CustomerId" = 49;
UPDATE public."Customer" SET "age" = 52, "occupation" = 'programmer' WHERE "CustomerId" = 50;
UPDATE public."Customer" SET "age" = 40, "occupation" = 'doctor' WHERE "CustomerId" = 51;
UPDATE public."Customer" SET "age" = 32, "occupation" = 'doctor' WHERE "CustomerId" = 52;
UPDATE public."Customer" SET "age" = 50, "occupation" = 'teacher' WHERE "CustomerId" = 53;
UPDATE public."Customer" SET "age" = 34, "occupation" = 'teacher' WHERE "CustomerId" = 54;
UPDATE public."Customer" SET "age" = 58, "occupation" = 'journalist' WHERE "CustomerId" = 55;
UPDATE public."Customer" SET "age" = 43, "occupation" = 'journalist' WHERE "CustomerId" = 56;
UPDATE public."Customer" SET "age" = 27, "occupation" = 'cook' WHERE "CustomerId" = 57;
UPDATE public."Customer" SET "age" = 31, "occupation" = 'cook' WHERE "CustomerId" = 58;
UPDATE public."Customer" SET "age" = 24, "occupation" = 'unemployed' WHERE "CustomerId" = 59;



select "CustomerId", "City", "Country", "age", "occupation"
from public."Customer";









