
package com.rebound.main;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.appcompat.widget.SearchView;
import androidx.core.view.WindowInsetsCompat;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.rebound.R;
import com.rebound.adapters.LastCollectionAdapter;
import com.rebound.checkout.ShoppingCartActivity;
import com.rebound.data.LastCollectionData;


public class MainPageActivity extends Fragment {

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.activity_main_page, container, false);

        // EdgeToEdge padding
        ViewCompat.setOnApplyWindowInsetsListener(view.findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        // Setup RecyclerView
        RecyclerView recyclerView = view.findViewById(R.id.recyclerViewLastCollection);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext(), LinearLayoutManager.HORIZONTAL, false));
        LastCollectionAdapter adapter = new LastCollectionAdapter(LastCollectionData.getItems());
        recyclerView.setAdapter(adapter);

        // Gắn sự kiện cho imgBell
        ImageView imgBell = view.findViewById(R.id.imgBell);
        imgBell.setOnClickListener(v -> {
            //Nếu mở màn hình có thông báo thì là True, còn không thì fasle
            boolean hasNotification = true;
            Intent intent = hasNotification ?
                    new Intent(requireContext(), NotificationActivity.class)
                    : new Intent(requireContext(), NoNotificationActivity.class);
            startActivity(intent);
        });

        //Gán mở Shopping Cart
        ImageView imgCart = view.findViewById(R.id.imgMainPageShoppingCart);
        imgCart.setOnClickListener(v -> {
            Intent intent = new Intent(requireContext(), ShoppingCartActivity.class);
            startActivity(intent);
        });

        // Gắn sự kiện cho SearchView
        SearchView searchView = view.findViewById(R.id.search_view);

        // Gắn sự kiện khi nhấn vào toàn bộ thanh
        searchView.setOnClickListener(v -> {
            boolean hasData = checkIfHasSearchData();

            Intent intent = new Intent(requireContext(),
                    hasData ? SearchActivity.class : SearchNoResultActivity.class);

            startActivity(intent);
        });

        // Khi người dùng nhập và nhấn "Tìm"
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                Intent intent = new Intent(requireContext(), SearchActivity.class);
                intent.putExtra("query", query);
                searchView.clearFocus();
                startActivity(intent);
                return true;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                // Nếu bạn có Search Suggestion có thể xử lý tại đây
                return false;
            }
        });

        return view;
    }

    // Kiểm tra xem có dữ liệu tìm kiếm gần đây không
    private boolean checkIfHasSearchData() {
        SharedPreferences prefs = requireContext().getSharedPreferences("search_prefs", Context.MODE_PRIVATE);
        String recentRaw = prefs.getString("recent_keywords", "");
        return !recentRaw.isEmpty();
    }
}