
# Database Schema Proposal for Food Delivery App

## Authentication Tables (Managed by Supabase)
- `auth.users`: Managed by Supabase Auth

## User Related Tables

### profiles
```sql
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  phone_number text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Define policies
create policy "Users can view their own profile" 
  on public.profiles 
  for select 
  using (auth.uid() = id);

create policy "Users can update their own profile" 
  on public.profiles 
  for update 
  using (auth.uid() = id);

-- Create profile when user signs up
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, name)
  values (new.id, new.raw_user_meta_data->>'name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### addresses
```sql
create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  label text not null,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  postal_code text not null,
  instructions text,
  is_default boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.addresses enable row level security;

-- Define policies
create policy "Users can view their own addresses" 
  on public.addresses 
  for select 
  using (auth.uid() = user_id);

create policy "Users can insert their own addresses" 
  on public.addresses 
  for insert 
  with check (auth.uid() = user_id);

create policy "Users can update their own addresses" 
  on public.addresses 
  for update 
  using (auth.uid() = user_id);

create policy "Users can delete their own addresses" 
  on public.addresses 
  for delete 
  using (auth.uid() = user_id);
```

## Restaurant Related Tables

### restaurants
```sql
create table public.restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  image_url text,
  address text not null,
  phone text,
  cuisine text[] not null default '{}',
  rating decimal(3,2) not null default 0,
  price_level smallint not null default 2,
  delivery_fee decimal(10,2) not null default 40,
  min_delivery_time smallint not null default 30,
  max_delivery_time smallint not null default 45,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.restaurants enable row level security;

-- Anyone can read restaurants
create policy "Anyone can view restaurants" 
  on public.restaurants 
  for select 
  using (true);
```

### menu_categories
```sql
create table public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references public.restaurants not null,
  name text not null,
  display_order smallint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.menu_categories enable row level security;

-- Anyone can read menu categories
create policy "Anyone can view menu categories" 
  on public.menu_categories 
  for select 
  using (true);
```

### menu_items
```sql
create table public.menu_items (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references public.restaurants not null,
  category_id uuid references public.menu_categories,
  name text not null,
  description text,
  price decimal(10,2) not null,
  image_url text,
  is_popular boolean not null default false,
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.menu_items enable row level security;

-- Anyone can read menu items
create policy "Anyone can view menu items" 
  on public.menu_items 
  for select 
  using (true);
```

## Order Related Tables

### orders
```sql
create type order_status as enum (
  'pending',
  'confirmed', 
  'preparing', 
  'out_for_delivery', 
  'delivered', 
  'cancelled'
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  restaurant_id uuid references public.restaurants not null,
  address_id uuid references public.addresses not null,
  status order_status not null default 'pending',
  subtotal decimal(10,2) not null,
  delivery_fee decimal(10,2) not null,
  total_price decimal(10,2) not null,
  payment_intent_id text,
  payment_status text default 'pending',
  estimated_delivery_time timestamptz,
  special_instructions text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.orders enable row level security;

-- Define policies
create policy "Users can view their own orders" 
  on public.orders 
  for select 
  using (auth.uid() = user_id);

create policy "Users can insert their own orders" 
  on public.orders 
  for insert 
  with check (auth.uid() = user_id);
```

### order_items
```sql
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders not null,
  menu_item_id uuid references public.menu_items not null,
  quantity smallint not null,
  unit_price decimal(10,2) not null,
  special_instructions text,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.order_items enable row level security;

-- Define policies
create policy "Users can view their own order items" 
  on public.order_items 
  for select 
  using (
    auth.uid() = (
      select user_id from public.orders where id = order_id
    )
  );

create policy "Users can insert their own order items" 
  on public.order_items 
  for insert 
  with check (
    auth.uid() = (
      select user_id from public.orders where id = order_id
    )
  );
```

## Adding Indexes for Performance

```sql
-- Indexes for profiles
create index idx_profiles_updated_at on public.profiles(updated_at);

-- Indexes for addresses
create index idx_addresses_user_id on public.addresses(user_id);
create index idx_addresses_is_default on public.addresses(user_id, is_default);

-- Indexes for restaurants
create index idx_restaurants_cuisine on public.restaurants using gin(cuisine);
create index idx_restaurants_is_active on public.restaurants(is_active);
create index idx_restaurants_price_level on public.restaurants(price_level);
create index idx_restaurants_rating on public.restaurants(rating);

-- Indexes for menu_items
create index idx_menu_items_restaurant_id on public.menu_items(restaurant_id);
create index idx_menu_items_category_id on public.menu_items(category_id);
create index idx_menu_items_is_popular on public.menu_items(is_popular);
create index idx_menu_items_is_available on public.menu_items(is_available);

-- Indexes for orders
create index idx_orders_user_id on public.orders(user_id);
create index idx_orders_restaurant_id on public.orders(restaurant_id);
create index idx_orders_status on public.orders(status);
create index idx_orders_created_at on public.orders(created_at);

-- Indexes for order_items
create index idx_order_items_order_id on public.order_items(order_id);
create index idx_order_items_menu_item_id on public.order_items(menu_item_id);
```
