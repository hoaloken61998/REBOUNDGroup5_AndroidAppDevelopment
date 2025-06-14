package com.rebound.main;

import android.app.TimePickerDialog;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CalendarView;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.google.android.material.button.MaterialButton;
import com.rebound.R;
import com.rebound.data.BranchData;
import com.rebound.connectors.BranchConnector;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import java.util.Calendar;
import java.util.Locale;

public class ScheduleServiceActivity extends Fragment {

    //Khai báo nút SELECTED
    private void setSelectedServiceButton(Button button) {
        button.setBackgroundTintList(ColorStateList.valueOf(Color.BLACK));
        button.setTextColor(Color.WHITE);
    }

    private void setUnselectedServiceButton(Button button) {
        button.setBackgroundTintList(ColorStateList.valueOf(Color.WHITE));
        button.setTextColor(Color.BLACK);
    }

    // ✅ Khai báo biến toàn cục, KHÔNG gán mặc định ngày hôm nay
    private final long[] selectedDateMillis = {0};

    public ScheduleServiceActivity() {
        // Required empty public constructor
    }

    // Chỉnh màu nút
    private void setSelectedButton(MaterialButton button) {
        button.setBackgroundTintList(ColorStateList.valueOf(Color.parseColor("#F2F0D4")));
        button.setTextColor(Color.WHITE);
        button.setStrokeWidth(0);
    }

    private void setUnselectedButton(MaterialButton button) {
        button.setBackgroundTintList(ColorStateList.valueOf(Color.WHITE));
        button.setTextColor(Color.parseColor("#22000000"));
        button.setStrokeColor(ColorStateList.valueOf(Color.parseColor("#22000000")));
        button.setStrokeWidth(1);
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.activity_schedule_service, container, false);

        TextView txtScheduleSelectedTime = view.findViewById(R.id.txtScheduleSelectedTime);
        MaterialButton btnScheduleBook = view.findViewById(R.id.btnScheduleBook);
        ImageView imgBell = view.findViewById(R.id.imgBell);
        CalendarView calendarView = view.findViewById(R.id.calendarView);

        // Bắt sự kiện chọn ngày
        calendarView.setOnDateChangeListener((view1, year, month, dayOfMonth) -> {
            Calendar selectedCalendar = Calendar.getInstance();
            selectedCalendar.set(year, month, dayOfMonth);
            selectedDateMillis[0] = selectedCalendar.getTimeInMillis();
        });

        // Bắt sự kiện chọn giờ
        txtScheduleSelectedTime.setOnClickListener(v -> {
            Calendar calendar = Calendar.getInstance();
            int hour = calendar.get(Calendar.HOUR_OF_DAY);
            int minute = calendar.get(Calendar.MINUTE);

            TimePickerDialog timePickerDialog = new TimePickerDialog(
                    requireContext(),
                    (timePicker, selectedHour, selectedMinute) -> {
                        String time = String.format("%02d:%02d", selectedHour, selectedMinute);
                        txtScheduleSelectedTime.setText(time);
                    },
                    hour, minute, true
            );
            timePickerDialog.show();
        });

        // Bấm nút Book Appointment
        btnScheduleBook.setOnClickListener(v -> {
            String selectedTime = txtScheduleSelectedTime.getText().toString();

            if (selectedDateMillis[0] == 0) {
                Toast.makeText(requireContext(), "Vui lòng chọn ngày!", Toast.LENGTH_SHORT).show();
                return;
            }

            if (selectedTime.isEmpty()) {
                Toast.makeText(requireContext(), "Vui lòng chọn giờ!", Toast.LENGTH_SHORT).show();
                return;
            }

            Date date = new Date(selectedDateMillis[0]);
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy", Locale.getDefault());
            String selectedDate = dateFormat.format(date);

            ReservationDialog dialog = ReservationDialog.newInstance(selectedDate, selectedTime);
            dialog.show(requireActivity().getSupportFragmentManager(), "ReservationDialog");

            btnScheduleBook.setBackgroundTintList(ColorStateList.valueOf(Color.parseColor("#BEB488")));
            btnScheduleBook.setTextColor(Color.WHITE);
            btnScheduleBook.setStrokeWidth(0);

            new Handler(Looper.getMainLooper()).postDelayed(() -> {
                btnScheduleBook.setBackgroundTintList(ColorStateList.valueOf(Color.WHITE));
                btnScheduleBook.setTextColor(Color.BLACK);
                btnScheduleBook.setStrokeColor(ColorStateList.valueOf(Color.parseColor("#BEB488")));
                btnScheduleBook.setStrokeWidth(1);
            }, 300);
        });

        // Branch buttons
        MaterialButton btnHanoi = view.findViewById(R.id.btnScheduleHanoi);
        MaterialButton btnHCM = view.findViewById(R.id.btnScheduleHCM);

        TextView txtBranch1 = view.findViewById(R.id.txtScheduleBranch1);
        TextView txtAddress1 = view.findViewById(R.id.txtScheduleAddress1);
        TextView txtTime1 = view.findViewById(R.id.txtScheduleTime1);
        ImageView imgBranch1 = view.findViewById(R.id.imgBranch1);

        TextView txtBranch2 = view.findViewById(R.id.txtScheduleBranch2);
        TextView txtAddress2 = view.findViewById(R.id.txtScheduleAddress2);
        TextView txtTime2 = view.findViewById(R.id.txtScheduleTime2);
        ImageView imgBranch2 = view.findViewById(R.id.imgBranch2);

        // Hà Nội
        btnHanoi.setOnClickListener(v -> {
            List<BranchConnector> branches = BranchData.getHanoiBranches();
            if (branches.size() >= 2) {
                txtBranch1.setText(branches.get(0).getName());
                txtAddress1.setText(branches.get(0).getAddress());
                txtTime1.setText(branches.get(0).getHours());
                imgBranch1.setImageResource(branches.get(0).getImageResId());

                txtBranch2.setText(branches.get(1).getName());
                txtAddress2.setText(branches.get(1).getAddress());
                txtTime2.setText(branches.get(1).getHours());
                imgBranch2.setImageResource(branches.get(1).getImageResId());
            }
            setSelectedButton(btnHanoi);
            setUnselectedButton(btnHCM);
        });

        // HCM
        btnHCM.setOnClickListener(v -> {
            List<BranchConnector> branches = BranchData.getHCMBranches();
            if (branches.size() >= 2) {
                txtBranch1.setText(branches.get(0).getName());
                txtAddress1.setText(branches.get(0).getAddress());
                txtTime1.setText(branches.get(0).getHours());
                imgBranch1.setImageResource(branches.get(0).getImageResId());

                txtBranch2.setText(branches.get(1).getName());
                txtAddress2.setText(branches.get(1).getAddress());
                txtTime2.setText(branches.get(1).getHours());
                imgBranch2.setImageResource(branches.get(1).getImageResId());
            }
            setSelectedButton(btnHCM);
            setUnselectedButton(btnHanoi);
        });

        //Đổi màu khi bấm vào các nút SELECTED
        Button btn1 = view.findViewById(R.id.btnScheduleSelected1);
        Button btn2 = view.findViewById(R.id.btnScheduleSelected2);
        Button btn3 = view.findViewById(R.id.btnScheduleSelected3);
        Button btn4 = view.findViewById(R.id.btnScheduleSelected4);

        View.OnClickListener serviceClickListener = v -> {
            Button clicked = (Button) v;

            // Reset tất cả nút
            setUnselectedServiceButton(btn1);
            setUnselectedServiceButton(btn2);
            setUnselectedServiceButton(btn3);
            setUnselectedServiceButton(btn4);

            // Highlight nút được bấm
            setSelectedServiceButton(clicked);
        };

        // Gán listener cho từng nút
        btn1.setOnClickListener(serviceClickListener);
        btn2.setOnClickListener(serviceClickListener);
        btn3.setOnClickListener(serviceClickListener);
        btn4.setOnClickListener(serviceClickListener);

        // Bấm vào chuông
        imgBell.setOnClickListener(v -> {
            boolean hasNotification = true;
            Intent intent = hasNotification
                    ? new Intent(requireContext(), NotificationActivity.class)
                    : new Intent(requireContext(), NoNotificationActivity.class);
            startActivity(intent);
        });

        return view;
    }
}